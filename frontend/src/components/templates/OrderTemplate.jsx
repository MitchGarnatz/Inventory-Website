import React from 'react';
import OrderCrud from "../crud/OrderCrud";
import {apiCart} from "../api/axiosConfig";
import { useEffect, useState } from "react";

function OrderTemplate() {

  const [rocks, setRocks] = useState([]);

  /* manage side effects */
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await apiCart.get("/all");
    setRocks(result.data);
  }

return (
  <div>
    <OrderCrud load={load} rocks={rocks} />
  </div>
);
}

export default OrderTemplate;