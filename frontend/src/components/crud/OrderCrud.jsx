import { useState, useEffect, useCallback } from "react";
import {apiCart, apiOrder} from "../api/axiosConfig";
import OrderList from "../list/OrderList";

const OrderCrud = ({ load, rocks }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [rockSelected, setRockSelected] = useState(false);

  const resetState = useCallback(() => {
    setName("");
    setLocation("");
    setPrice("");
    setImagePath("");
    setRockSelected(false); // Reset rock selection
  }, []);

  const memoizedAddToCart = useCallback(async () => {
    if (!name || !location) {
        alert("Rock Details Not Found");
        return;
    }

    try {
        await apiOrder.post("/create", {
            name: name,
            location: location,
            price: price,
            imagePath: imagePath
        });
    
        alert("Information has been saved");
        resetState();
        load();
    
    } catch (error) {
          console.error("Error:", error.message);
          alert("An error occurred while saving the information. Invalid input.");
    }
  }, [name, location, price, imagePath, resetState, load]);
    
  const selectRock = useCallback((rocks) => {
    setName(rocks.name);
    setLocation(rocks.location);
    setPrice(rocks.price);
    setImagePath(rocks.imagePath);
    setRockSelected(true); // Mark rock as selected
  }, []);


  async function removeFromCart(id) {
    await apiCart.delete("/delete/" + id);
    alert("Rock Details Deleted Successfully");
    load();
  }

  useEffect(() => {
    if (rockSelected) {
        memoizedAddToCart(); // Call memoizedAddToCart when rock details are selected
        setRockSelected(false);
    }
  }, [rockSelected, memoizedAddToCart]);


/* jsx */
  return (
    <div className="container">
      <OrderList
        rocks={rocks}
        purchaseRock={selectRock}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default OrderCrud;