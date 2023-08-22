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

  async function load(sortByPriceAsc = false, sortByPriceDesc = false) {
    let url = "/all";

    if (sortByPriceAsc) {
        url = "/all/sortByPrice";
    } else if (sortByPriceDesc) {
        url = "/all/sortByPriceDesc";
    }

    const result = await apiRock.get(url);
    setRocks(result.data);
}

return (
  <div>
    <InventoryCrud load={load} rocks={rocks} />
  </div>
);
}

export default InventoryTemplate;