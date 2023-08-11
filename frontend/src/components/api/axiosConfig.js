import axios from "axios";

export const apiRock = axios.create({
  baseURL: "http://localhost:8000/rock",
});

export const apiRockName = axios.create({
  baseURL: "http://localhost:8000/rock-name",
});

