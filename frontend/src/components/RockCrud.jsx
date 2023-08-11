import { useState , useEffect, useRef} from "react";
import {apiRock} from "./api/axiosConfig";
import RockList from "./RockList";

const RockCrud = ({ load, rocks }) => {
/* state definition  */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const Test = require("./images/" + imageFile.name);
      setImagePath(Test);
    }
  }, [imageFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  /* being handlers */
  async function save(event) {
    event.preventDefault();

    if (!name || !location || !weight || !width || !length || !height) {
      return alert("Rock Details Not Found");
    }
    
    hiddenFileInput.current.value = null;
    setImageFile(null);

    try {
      await apiRock.post("/create", {
        name: name,
        location: location,
        weight: weight,
        price: price,
        width: width,
        length: length,
        height: height,
        imagePath: imagePath
      });
      alert("Information has been saved");
      // reset state
      setId("");
      setName("");
      setLocation("");
      setWeight("");
      setPrice("");
      setWidth("");
      setLength("");
      setHeight("");
      setImagePath("");
      load();

    } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while saving the information. Invalid input.");
    }
  }
  async function editRock(rocks) {
    setName(rocks.name);
    setLocation(rocks.location);
    setWeight(rocks.weight);
    setPrice(rocks.price);
    setWidth(rocks.width);
    setLength(rocks.length);
    setHeight(rocks.height);
    setImagePath(rocks.imagePath);
    setId(rocks.id);
  }

  async function deleteRock(id) {
    await apiRock.delete("/delete/" + id);
    alert("Rock Details Deleted Successfully");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Rock Details Not Found");
    try {
      await apiRock.put("/update", {
        id: id,
        name: name,
        location: location,
        weight: weight,
        price: price,
        width: width,
        length: length,
        height: height,
        imagePath: imagePath,
        imageFile: imageFile
      });
      alert("Rock Details Updated");
      // reset state
      setId("");
      setName("");
      setLocation("");
      setWeight("");
      setPrice("");
      setWidth("");
      setLength("");
      setHeight("");
      setImagePath("");
      setImageFile(null);
      load();
    }
    catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while saving the information. Invalid input.");
    }
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
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={e => setLocation(e.target.value)}
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
            <label>Width</label>
            <input
              type="text"
              className="form-control"
              value={width}
              placeholder=""
              onChange={e => setWidth(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label>Length</label>
            <input
              type="text"
              className="form-control"
              value={length}
              placeholder=""
              onChange={e => setLength(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label>Height</label>
            <input
              type="text"
              className="form-control"
              value={height}
              placeholder=""
              onChange={e => setHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              value={price}
              placeholder=""
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Image</label>
            <input 
              id="fileInput"
              type="file" 
              ref={hiddenFileInput}
              accept="image/*" 
              onChange={handleFileChange} 
              className="form-control"
              placeholder=""
            />
            <label>Image</label>
            <input
              type="text"
              className="form-control"
              value={imagePath}
              placeholder=""
              onChange={e => setImagePath(e.target.value)}
            />
          </div>
          <div className="col-4">
            <img src={imagePath} alt="" style={{ maxWidth: '100%' }}/>
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

      <RockList
        rocks={rocks}
        editRock={editRock}
        deleteRock={deleteRock}
      />
    </div>
  );
};

export default RockCrud;