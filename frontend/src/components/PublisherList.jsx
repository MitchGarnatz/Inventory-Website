import React from "react";

const PublisherList = ({ rocks, editRock, deleteRock }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Name</th>
          <th scope="col">Weight</th>
          <th scope="col">Price</th>

          <th scope="col">Option</th>
        </tr>
      </thead>
      {rocks.map((rock, index) => {
        return (
          <tbody key={rock.id}>
            <tr>
              <th scope="row">{index + 1} </th>
              <td>{rock.name}</td>
              <td>{rock.weight}</td>
              <td>{rock.price}</td>
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

export default PublisherList;