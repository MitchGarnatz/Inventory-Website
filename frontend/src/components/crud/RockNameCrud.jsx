import { useState } from "react";
import {apiRockName} from "../api/axiosConfig";
import RockNameList from "../list/RockNameList";

const RockNameCrud = ({ load, rockNames }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  /* being handlers */
  async function save(event) {
    event.preventDefault();

    if (!name) {
      return alert("Rock Name Not Found");
    }

    try {
      await apiRockName.post("/create", {
        name: name
      });
      alert("Information has been saved");
      // reset state
      setId("");
      setName("");
      load();

    } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while saving the information. Invalid input.");
    }
  }
  async function editRock(rockNames) {
    setName(rockNames.name);
    setId(rockNames.id);
  }

  async function deleteRock(id) {
    await apiRockName.delete("/delete/" + id);
    alert("Rock Details Deleted Successfully");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Rock Name Details Not Found");
    try {
      await apiRockName.put("/update", {
        id: id,
        name: name
      });
      alert("Rock Details Updated");
      // reset state
      setId("");
      setName("");
      load();
    }
    catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while saving the information. Invalid input.");
    }
  }

  async function deleteAll(event) {
    event.preventDefault();
    await apiRockName.delete("/deleteAll");
    alert("Rock Details All Deleted Successfully");
    load();
  }

  /* end handlers */

/* jsx */
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            hidden
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Submit
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update
          </button>
          <button className="btn btn-warning m-4" onClick={deleteAll}>
            Delete All Records
          </button>
        </div>
      </form>

      <RockNameList
        rockNames={rockNames}
        editRock={editRock}
        deleteRock={deleteRock}
      />
    </div>
  );
};

export default RockNameCrud;