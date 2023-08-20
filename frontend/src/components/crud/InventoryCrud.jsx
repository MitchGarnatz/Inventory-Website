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
  const [filteredAttributes, setFilteredAttributes] = useState([]);

  const handleCheckboxChange = (attribute) => {
    if (filteredAttributes.includes(attribute)) {
      setFilteredAttributes(filteredAttributes.filter(attr => attr !== attribute));
    } else {
      setFilteredAttributes([...filteredAttributes, attribute]);
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
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('iron')}
            onChange={() => handleCheckboxChange('iron')}
          />
          <label className="form-check-label">Iron</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('green jasper')}
            onChange={() => handleCheckboxChange('green jasper')}
          />
          <label className="form-check-label">Green Jasper</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('red jasper')}
            onChange={() => handleCheckboxChange('red jasper')}
          />
          <label className="form-check-label">Red Jasper</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('agate')}
            onChange={() => handleCheckboxChange('agate')}
          />
          <label className="form-check-label">Agate</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('binghamite')}
            onChange={() => handleCheckboxChange('binghamite')}
          />
          <label className="form-check-label">Binghamite</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filteredAttributes.includes('petrified wood')}
            onChange={() => handleCheckboxChange('petrified wood')}
          />
          <label className="form-check-label">Petrified Wood</label>
        </div>
      </div>
      
      <InventoryList
        rocks={rocks}
        selectRockAndAddToCart={selectRock}
        filteredAttributes={filteredAttributes}
      />
    </div>
  );
};

export default InventoryCrud;