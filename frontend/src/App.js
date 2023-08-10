import "bootstrap/dist/css/bootstrap.css";
import api from "./api/axiosConfig";
import { useEffect, useState } from "react";
import "./App.css";
import RockCrud from "./components/RockCrud";
import Navigation from "./components/Navigation";

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
      <div className="container">
        <h1>Template Selector</h1>
        <Navigation />
      </div>
      
      <h1 className="text-center">List Of Rocks</h1>
      <RockCrud load={load} rocks={rocks} />
    </div>

    
  );
}

export default App;