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
  const [minLength, setMinLength] = useState(""); 
  const [maxLength, setMaxLength] = useState("");
  const [minWidth, setMinWidth] = useState(""); 
  const [maxWidth, setMaxWidth] = useState("");
  const [minHeight, setMinHeight] = useState(""); 
  const [maxHeight, setMaxHeight] = useState("");
  const [minWeight, setMinWeight] = useState(""); 
  const [maxWeight, setMaxWeight] = useState("");
  const [filteredRocks, setFilteredRocks] = useState([]);
  const [showFilteredRocks, setShowFilteredRocks] = useState(false);

  const handleMinLengthChange = (event) => {
    setMinLength(event.target.value);
  };
  
  const handleMaxLengthChange = (event) => {
    setMaxLength(event.target.value);
  };
  const handleMinWidthChange = (event) => {
    setMinWidth(event.target.value);
  };
  
  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };
  const handleMinHeightChange = (event) => {
    setMinHeight(event.target.value);
  };
  
  const handleMaxHeightChange = (event) => {
    setMaxHeight(event.target.value);
  };

  const handleMinWeightChange = (event) => {
    setMinWeight(event.target.value);
  };

  const handleMaxWeightChange = (event) => {
    setMaxWeight(event.target.value);
  };

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

  const handleResetFilters = () => {
    setFilteredAttributes([]);
    setFilteredLocations([]);
    setMinLength("");
    setMaxLength("");
    setMinWidth("");
    setMaxWidth("");
    setMinHeight("");
    setMaxHeight("");
    setMinWeight("");
    setMaxWeight("");
    setFilteredRocks([]);
    setShowFilteredRocks(false);
  };

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

  const handleSubmit = () => {
    const lowercasedNames = filteredAttributes.map(name => name.toLowerCase());
    const lowercasedLocations = filteredLocations.map(location => location.toLowerCase());
  
    const filteredRocks = rocks.filter(rock => {
      const isNameMatch = filteredAttributes.length === 0 || lowercasedNames.includes(rock.name.toLowerCase());
      const isLocationMatch = filteredLocations.length === 0 || lowercasedLocations.includes(rock.location.toLowerCase());
      const isMinLengthMatch = !minLength || rock.length >= parseInt(minLength, 10); // Ensure to specify base 10
      const isMaxLengthMatch = !maxLength || rock.length <= parseInt(maxLength, 10); // Ensure to specify base 10
      const isMinWidthMatch = !minWidth || rock.width >= parseInt(minWidth, 10); // Ensure to specify base 10
      const isMaxWidthMatch = !maxWidth || rock.width <= parseInt(maxWidth, 10); // Ensure to specify base 10
      const isMinHeightMatch = !minHeight || rock.height >= parseInt(minHeight, 10); // Ensure to specify base 10
      const isMaxHeightMatch = !maxHeight || rock.height <= parseInt(maxHeight, 10); // Ensure to specify base 10
      const isMinWeightMatch = !minWeight || rock.weight >= parseInt(minWeight, 10); // Ensure to specify base 10
      const isMaxWeightMatch = !maxWeight || rock.weight <= parseInt(maxWeight, 10); // Ensure to specify base 10

      setShowFilteredRocks(true);
      toggleDropdown();
      toggleDropdownLocations();
  
      return isNameMatch && isLocationMatch && isMinLengthMatch && isMaxLengthMatch && isMinWidthMatch &&
             isMaxWidthMatch && isMinHeightMatch && isMaxHeightMatch && isMinWeightMatch && isMaxWeightMatch;
    });
  
    setFilteredRocks(filteredRocks);
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
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownFiltersButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              Filters
            </button>
            <div className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownFiltersButton">
              <div className="form-group px-3">
                <label>Filter by Name:</label>
                {filterNames.map(name => (
                  <div key={name} className="form-check form-check-inline">
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
              <div className="form-group px-3 ">
                <label>Filter by Location:</label>
                {filterLocations.map(location => (
                  <div key={location} className="form-check form-check-inline">
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
              <div className="form-group px-3">
                <label>Filter by Length:</label>
                <input
                  type="number"
                  className="form-control"
                  value={minLength}
                  onChange={handleMinLengthChange}
                  placeholder="Min Length"
                />
                <input
                  type="number"
                  className="form-control"
                  value={maxLength}
                  onChange={handleMaxLengthChange}
                  placeholder="Max Length"
                />
              </div>

              <div className="form-group px-3">
                <label>Filter by Width:</label>
                <input
                  type="number"
                  className="form-control"
                  value={minWidth}
                  onChange={handleMinWidthChange}
                  placeholder="Min Width"
                />
                <input
                  type="number"
                  className="form-control"
                  value={maxWidth}
                  onChange={handleMaxWidthChange}
                  placeholder="Max Width"
                />
              </div>

              <div className="form-group px-3">
                <label>Filter by Height:</label>
                <input
                  type="number"
                  className="form-control"
                  value={minHeight}
                  onChange={handleMinHeightChange}
                  placeholder="Min Height"
                />
                <input
                  type="number"
                  className="form-control"
                  value={maxHeight}
                  onChange={handleMaxHeightChange}
                  placeholder="Max Height"
                />
              </div>

              <div className="form-group px-3">
                <label>Filter by Weight:</label>
                <input
                  type="number"
                  className="form-control"
                  value={minWeight}
                  onChange={handleMinWeightChange}
                  placeholder="Min Weight"
                />
                <input
                  type="number"
                  className="form-control"
                  value={maxWeight}
                  onChange={handleMaxWeightChange}
                  placeholder="Max Weight"
                />
              </div>
              
              <div className="row form-group px-3">
                <div className="col-md-8"></div>
                <div className="col-md-4 form-group d-flex justify-content-between px-3">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Apply Filters
                  </button>
                  <button className="btn btn-secondary" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                  <button className="btn btn-secondary" onClick={toggleDropdown}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 p-3">
          <button className="btn btn-primary" onClick={() => load(true, false)}>
              Price Low - High
            </button>
        </div>
        <div className="col-md-2 p-3">
          <button className="btn btn-primary" onClick={() => load(false, true)}>
              Price High - Low
          </button>
        </div>
      </div>

      <InventoryList
        rocks={showFilteredRocks
          ? filteredRocks
          : rocks}
        selectRockAndAddToCart={selectRock}
      />
    </div>
  );
};

export default InventoryCrud;