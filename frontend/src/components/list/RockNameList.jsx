import React from "react";

const RockNameList = ({ rockNames, editRock, deleteRock }) => {

  
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      {rockNames.map((rockName, index) => {

        return (
          <tbody key={rockName.id}>
            <tr>
              <th scope="row">{index + 1} </th>
              <td>{rockName.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editRock(rockName)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteRock(rockName.id)}
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

export default RockNameList;