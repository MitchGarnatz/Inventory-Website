import React from "react";
import altImage from '../images/alternate.jpeg';

const RockList = ({ rocks, editRock, deleteRock }) => {
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
            <button className="btn btn-warning" onClick={() => editRock(rock)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => deleteRock(rock.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RockList;