import { useState } from "react";
import {apiCart, apiOrder} from "../api/axiosConfig";
import OrderList from "../list/OrderList";

const OrderCrud = ({ load, rocks }) => {
/* state definition  */
const [name, setName] = useState("");
const [location, setLocation] = useState("");
const [price, setPrice] = useState("");
const [imagePath, setImagePath] = useState("");


  /* being handlers */
  async function purchaseRock() {

    if (!name || !location) {
      return alert("Rock Details Not Found");
    }

    try {
      await apiOrder.post("/create", {
        name: name,
        location: location,
        price: price,
        imagePath: imagePath
      });
      alert("Information has been saved");
      // reset state
      setName("");
      setLocation("");
      setPrice("");
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
    setPrice(rocks.price);
    setImagePath(rocks.imagePath);
  }

  async function removeFromCart(id) {
    await apiCart.delete("/delete/" + id);
    alert("Rock Details Deleted Successfully");
    load();
  }


/* jsx */
  return (
    <div className="container mt-4">

      <OrderList
        rocks={rocks}
        selectRock={selectRock}
        purchaseRock={purchaseRock}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default OrderCrud;