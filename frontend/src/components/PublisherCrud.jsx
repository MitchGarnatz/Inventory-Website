import { useState } from "react";
import api from "../api/axiosConfig";
import PublisherList from "./PublisherList";

const PublisherCrud = ({ load, rocks }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  /* being handlers */
  async function save(event) {
    event.preventDefault();
    await api.post("/create", {
      name: name,
      weight: weight,
      price: price,
    });
    alert("Information has been saved");
    // reset state
    setId("");
    setName("");
    setWeight("");
    setPrice("");
    load();
  }
  async function editRock(rocks) {
    setName(rocks.name);
    setWeight(rocks.weight);
    setPrice(rocks.price);
    setId(rocks.id);
  }

  async function deleteRock(id) {
    await api.delete("/delete/" + id);
    alert("Rock Details Deleted Successfully");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Rock Details Not Found");
    await api.put("/update", {
      id: id,
      name: name,
      weight: weight,
      price: price,
    });
    alert("Rock Details Updated");
    // reset state
    setId("");
    setName("");
    setWeight("");
    setPrice("");
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

        <div className="form-group mb-2">
          <label>Weight</label>
          <input
            type="text"
            className="form-control"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-4">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              value={price}
              placeholder="Price in $"
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Submit
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update
          </button>
        </div>
      </form>
      <PublisherList
        rocks={rocks}
        editRock={editRock}
        deleteRock={deleteRock}
      />
    </div>
  );
};

export default PublisherCrud;