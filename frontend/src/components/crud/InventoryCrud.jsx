import { useState, useEffect, useCallback} from "react";
import {apiCart} from "../api/axiosConfig";
import InventoryList from "../list/InventoryList";
import FilterMenu from '../filter/FilterMenu'; 

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
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredRocks, setFilteredRocks] = useState([]);
  const [showFilteredRocks, setShowFilteredRocks] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

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

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
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
    setMinPrice("");
    setMaxPrice("");
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
      const isMinPriceMatch = !minPrice || rock.price >= parseInt(minPrice, 10); // Ensure to specify base 10
      const isMaxPriceMatch = !maxPrice || rock.price <= parseInt(maxPrice, 10); // Ensure to specify base 10

      setShowFilteredRocks(true);
      toggleFilter();
  
      return isNameMatch && isLocationMatch && isMinLengthMatch && isMaxLengthMatch && isMinWidthMatch &&
             isMaxWidthMatch && isMinHeightMatch && isMaxHeightMatch && isMinWeightMatch && isMaxWeightMatch &&
             isMinPriceMatch && isMaxPriceMatch;
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
      

      <div className="container">
        <div className="col-md-2 p-3">
          <button className="btn btn-primary" onClick={toggleFilter}>
            Open Filter Menu
          </button>
        </div>
        <FilterMenu 
          isOpen={filterOpen}
          onClose={toggleFilter}
          filterNames={filterNames}
          filterLocations={filterLocations}
          filteredAttributes={filteredAttributes}
          filteredLocations={filteredLocations}
          minLength={minLength}
          maxLength={maxLength}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minHeight={minHeight}
          maxHeight={maxHeight}
          minWeight={minWeight}
          maxWeight={maxWeight}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleCheckboxChange={handleCheckboxChange}
          handleLocationCheckboxChange={handleLocationCheckboxChange}
          handleMinLengthChange={handleMinLengthChange}
          handleMaxLengthChange={handleMaxLengthChange}
          handleMinWidthChange={handleMinWidthChange}
          handleMaxWidthChange={handleMaxWidthChange}
          handleMinHeightChange={handleMinHeightChange}
          handleMaxHeightChange={handleMaxHeightChange}
          handleMinWeightChange={handleMinWeightChange}
          handleMaxWeightChange={handleMaxWeightChange}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleSubmit={handleSubmit}
          handleResetFilters={handleResetFilters}
          />
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