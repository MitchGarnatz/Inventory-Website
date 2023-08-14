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
    <div className="container mt-4">

      <InventoryList
        rocks={rocks}
        selectRockAndAddToCart={selectRock}
      />
    </div>
  );
};

export default InventoryCrud;