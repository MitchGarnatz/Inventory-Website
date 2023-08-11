import React from 'react';
import RockCrud from "../RockCrud";
import api from "../api/axiosConfig";

import { useEffect, useState } from "react";

function ManagementTemplate() {

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
      <h2>Brows</h2>
      <h1 className="text-center">List Of Rocks</h1>
      <RockCrud load={load} rocks={rocks} />
    </div>
  );
}

export default ManagementTemplate;