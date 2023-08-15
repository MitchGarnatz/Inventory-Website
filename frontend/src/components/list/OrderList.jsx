import React from "react";

import { useState } from "react";
import altImage from '../images/alternate.jpeg';

const OrderList = ({ rocks, purchaseRock, removeFromCart}) => {

  const [orderDetails, setOrderDetails] = useState([]);

  const handlePurchaseAll = async () => {
    const purchasedDetails = [];
    for (const rock of rocks) {
      try {
        await purchaseRock(rock);
        purchasedDetails.push(rock);
        console.log('Purchased rock:', rock);
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while purchasing the rocks. Please try again.");
      }
    }
    setOrderDetails(purchasedDetails);
  };


  return (
    <div>
        <button
                type="button"
                className="btn btn-primary m-2"
                onClick={() => handlePurchaseAll()}
                >
                Purchase Order
            </button>
        <div className="container-fluid">
        {rocks.map((rock, index) => (
            <div key={rock.id} className="row-item">
            <div>
                <h3>{rock.name}</h3>
                <p>{rock.location}</p>
            </div>
            <img src={rock.imagePath || altImage} alt="Rock" className="rock-image" />
            <div>
                <p>Length: {rock.length}</p>
                <p>Width: {rock.width}</p>
                <p>Height: {rock.height}</p>
                <p>Weight: {rock.weight}</p>
                <p>Price: {rock.price}</p>

                <button
                        type="button"
                        className="btn btn-danger m-2"
                        onClick={() => removeFromCart(rock.id)}
                        >
                        Remove From Cart
                </button>
            </div>
        </div>
        ))}

            {orderDetails.length > 0 && (
                <div>
                    <h2>Order Details</h2>
                    <ul>
                    {orderDetails.map((order, index) => (
                        <li key={index}>
                        Confirmation #{order.id} - {order.name} - {order.location} - ${order.price}
                        </li>
                    ))}
                    </ul>
                </div>
            )}

        </div>
    </div>
  );
  
};

export default OrderList;