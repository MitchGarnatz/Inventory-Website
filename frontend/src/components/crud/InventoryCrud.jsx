import { useState} from "react";
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


  /* being handlers */
  async function addToCart() {

    if (!name || !location || !weight || !width || !length || !height) {
      return alert("Rock Details Not Found");
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
      // reset state
      setId("");
      setName("");
      setLocation("");
      setWeight("");
      setPrice("");
      setWidth("");
      setLength("");
      setHeight("");
      setImagePath("");
      load();

    } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while saving the information. Invalid input.");
    }
  }
  async function selectRock(rocks) {
    setName(rocks.name);
    setLocation(rocks.location);
    setWeight(rocks.weight);
    setPrice(rocks.price);
    setWidth(rocks.width);
    setLength(rocks.length);
    setHeight(rocks.height);
    setImagePath(rocks.imagePath);
    setId(rocks.id);
  }


/* jsx */
  return (
    <div className="container mt-4">

      <InventoryList
        rocks={rocks}
        selectRock={selectRock}
        addToCart={addToCart}
      />
    </div>
  );
};

export default InventoryCrud;