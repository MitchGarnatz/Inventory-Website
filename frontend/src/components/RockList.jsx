import React from "react";

const RockList = ({ rocks, editRock, deleteRock }) => {
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
              <td><img src={rock.imagePath} alt="Uploaded" style={{ maxWidth: '100%' }} /></td>
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