import { useState, useEffect, useCallback} from "react";
import {apiCart} from "../api/axiosConfig";
import InventoryList from "../list/InventoryList";

const InventoryCrud = ({ load, rocks }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [rockSelected, setRockSelected] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenLocations, setIsDropdownOpenLocations] = useState(false);

  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownLocations = () => {
    setIsDropdownOpenLocations(!isDropdownOpenLocations);
  };

  const filterNames = [
    'Iron',
    'Green Jasper',
    'Red Jasper',
    'Agate',
    'Binghamite',
    'Petrified Wood',
    'Quarts'
  ];

  const filterLocations = [
    'Minnesota',
    'North Dakota',
    'South Dakota',
    'Montana',
    'Colorado',
    'Idaho',
    'Wisconsin',
    'Michigan'
  ];

  const handleCheckboxChange = (attribute) => {
    if (filteredAttributes.includes(attribute)) {
      setFilteredAttributes(filteredAttributes.filter(attr => attr !== attribute));
    } else {
      setFilteredAttributes([...filteredAttributes, attribute]);
    }
  };

  const handleLocationCheckboxChange = (location) => {
    if (filteredLocations.includes(location)) {
      setFilteredLocations(filteredLocations.filter(loc => loc !== location));
    } else {
      setFilteredLocations([...filteredLocations, location]);
    }
  };

  const resetState = useCallback(() => {
    setId("");
    setName("");
    setLocation("");
    setWeight("");
    setPrice("");
    setWidth("");
    setLength("");
    setHeight("");
    setImagePath("");
    setRockSelected(false); // Reset rock selection
  }, []);

  const memoizedAddToCart = useCallback(async () => {
    if (!name || !location || !weight || !width || !length || !height) {
        alert("Rock Details Not Found");
        return;
    }

  try {
    await apiCart.post("/addToCart", {
        id: id,
        name: name,
        location: location,
        weight: weight,
        price: price,
        width: width,
        length: length,
        height: height,
        imagePath: imagePath
    });

      alert("Information has been saved");
      resetState();
      load();

    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while saving the information. Invalid input.");
    }
  }, [name, location, weight, width, length, height, id, price, imagePath, resetState, load]);

  const selectRock = useCallback((rocks) => {
    setName(rocks.name);
    setLocation(rocks.location);
    setWeight(rocks.weight);
    setPrice(rocks.price);
    setWidth(rocks.width);
    setLength(rocks.length);
    setHeight(rocks.height);
    setImagePath(rocks.imagePath);
    setId(rocks.id);
    setRockSelected(true); // Mark rock as selected
  }, []);

  useEffect(() => {
    if (rockSelected) {
        memoizedAddToCart(); // Call memoizedAddToCart when rock details are selected
    }
  }, [rockSelected, memoizedAddToCart]);


  /* jsx */
  return (
    <div className="container">
      <div className="dropdown-container">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle dropdown-button"
            type="button"
            id="dropdownNameButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
          Name
          </button>
          <div className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton">
            {filterNames.map(name => (
              <div key={name} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filteredAttributes.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                />
                <label className="form-check-label">{name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle dropdown-button"
            type="button"
            id="dropdownLocationButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isDropdownOpenLocations}
            onClick={toggleDropdownLocations}
          >
            Location
          </button>
          <div className={`dropdown-menu${isDropdownOpenLocations ? ' show' : ''}`} aria-labelledby="dropdownLocationButton">
          {/* Mapping through filterLocations instead of filterNames */}
            {filterLocations.map(location => (
            <div key={location} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={filteredLocations.includes(location)}
                onChange={() => handleLocationCheckboxChange(location)}
              />
              <label className="form-check-label">{location}</label>
            </div>
            ))}
          </div>
        </div>
      </div>

      <InventoryList
        rocks={rocks}
        selectRockAndAddToCart={selectRock}
        filteredAttributes={filteredAttributes}
        filteredLocations={filteredLocations}
      />
    </div>
  );
};

export default InventoryCrud;