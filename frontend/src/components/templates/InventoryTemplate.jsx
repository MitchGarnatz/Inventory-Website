import React from 'react';
import InventoryCrud from "../crud/InventoryCrud";
import {apiRock} from "../api/axiosConfig";
import { useEffect, useState } from "react";

function InventoryTemplate() {

  const [rocks, setRocks] = useState([]);

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await apiRock.get("/all");
    
    setRocks(result.data);
  }

return (
  <div>
    <InventoryCrud load={load} rocks={rocks} />
  </div>
);
}

export default InventoryTemplate;