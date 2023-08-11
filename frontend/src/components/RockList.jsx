import React from "react";

import altImage from './images/alternate.jpeg';

const RockList = ({ rocks, editRock, deleteRock }) => {

  var isPrimaryImageAvailable = true; // Set this based on your logic
  const altText = "Alternative Image";
  
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Weight</th>
          <th scope="col">Width</th>
          <th scope="col">Length</th>
          <th scope="col">Height</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      {rocks.map((rock, index) => {
        
        if (rock.imagePath === "") {
          isPrimaryImageAvailable = false;
        } else {
          isPrimaryImageAvailable = true;
        }

        return (
          <tbody key={rock.id}>
            <tr>
              <th scope="row">{index + 1} </th>
              <td>{rock.name}</td>
              <td>{rock.location}</td>
              <td>{rock.weight}</td>
              <td>{rock.width}</td>
              <td>{rock.length}</td>
              <td>{rock.height}</td>
              <td>{rock.price}</td>
              <td>
                {isPrimaryImageAvailable ? (
                  <img src={rock.imagePath} alt={altText} />
                ) : (
                  <img src={altImage} alt={altText} />
                )}             
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editRock(rock)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteRock(rock.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default RockList;