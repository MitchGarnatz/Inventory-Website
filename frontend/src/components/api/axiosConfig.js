import axios from "axios";

export const apiRock = axios.create({
  baseURL: "http://localhost:8000/rock",
});

export const apiRockName = axios.create({
  baseURL: "http://localhost:8000/rock-name",
});

export const apiCart = axios.create({
  baseURL: "http://localhost:8000/cart",
});

export const apiOrder = axios.create({
  baseURL: "http://localhost:8000/order",
});

