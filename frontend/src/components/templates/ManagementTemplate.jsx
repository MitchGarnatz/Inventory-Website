import React from 'react';
import RockCrud from "../crud/RockCrud";
import RockNameCrud from "../crud/RockNameCrud";
import {apiRock, apiRockName} from "../api/axiosConfig";
import { useEffect, useState } from "react";

function ManagementTemplate() {

    const [rocks, setRocks] = useState([]);
    const [rockNames, setRockNames] = useState([]);

    /* manage side effects */
    useEffect(() => {
      (async () => await load())();
    }, []);
  
    async function load() {
      const result = await apiRock.get("/all");
      setRocks(result.data);
    }

    useEffect(() => {
        (async () => await loadNames())();
      }, []);
    
      async function loadNames() {
        const result = await apiRockName.get("/all");
        setRockNames(result.data);
      }

  return (
    <div>
      <h2>Brows</h2>
      <h1 className="text-center">List Of Rock Names</h1>
      <RockNameCrud load={loadNames} rockNames={rockNames} />

      <h1 className="text-center">List Of Rocks</h1>
      <RockCrud load={load} rocks={rocks} />
    </div>
  );
}

export default ManagementTemplate;