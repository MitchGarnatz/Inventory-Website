import React from "react";
import altImage from '../images/alternate.jpeg';

const InventoryList = ({ rocks, selectRockAndAddToCart}) => {
  
  return (
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
          </div>
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => selectRockAndAddToCart(rock)}
            >
              Add To Cart
            </button>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;