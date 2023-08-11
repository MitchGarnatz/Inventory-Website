import React from 'react';
import api from "../api/axiosConfig";

import { useEffect, useState } from "react";

function InventoryTemplate() {

    const [rocks, setRocks] = useState([]);

    /* manage side effects */
    useEffect(() => {
        (async () => await load())();
    }, []);
    
    async function load() {
        const result = await api.get("/all");
        setRocks(result.data);
    }

    return (
    <div>
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
            </tr>
          </tbody>
        );
      })}
    </table>
    </div>
    );
}

export default InventoryTemplate;