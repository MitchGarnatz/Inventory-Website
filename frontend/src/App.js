import "bootstrap/dist/css/bootstrap.css";
import api from "./api/axiosConfig";
import { useEffect, useState } from "react";
import "./App.css";
import PublisherCrud from "./components/PublisherCrud";

function App() {
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
      <h1 className="text-center">List Of Rocks</h1>
      <PublisherCrud load={load} rocks={rocks} />
    </div>
  );
}

export default App;