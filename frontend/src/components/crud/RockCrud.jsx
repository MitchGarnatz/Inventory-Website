import { useState , useEffect, useRef} from "react";
import {apiRock, apiRockName} from "../api/axiosConfig";
import RockList from "../list/RockList";

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

  const [namesList, setNamesList] = useState([]);
  const [selectedName, setSelectedName] = useState('');


  useEffect(() => {
    // Fetch the names from the API endpoint
    apiRockName.get('/all-names') // Replace with your actual API endpoint
      .then(response => {
        setNamesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching names:', error);
        });
  }, []);

  useEffect(() => {
    if (imageFile) {
      const Test = require("../images/" + imageFile.name);
      setImagePath(Test);
    }
  }, [imageFile]);

  useEffect(() => {
    if (name) {
      setSelectedName(name);
    }
  }, [name]);

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
        imagePath: imagePath,
        selectedName: selectedName
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
      setSelectedName('');
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

  async function deleteAll(event) {
    event.preventDefault();
    await apiRock.delete("/deleteAll");
    alert("Rock Details All Deleted Successfully");
    load();
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
        imageFile: imageFile,
        selectedName: selectedName
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
      setSelectedName('');
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
    <div className="container-fluid mt-4">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                hidden
                value={id}
                onChange={e => setId(e.target.value)}
              />
              <label htmlFor="nameSelect">Select a Name:</label>
              <select
                id="nameSelect"
                value={selectedName}
                onChange={e => {
                  setSelectedName(e.target.value);
                  setName(e.target.value);
                }}
              >
                <option value="">Select an option</option>
                {namesList.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
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
          </div>

          <div className="row">
            <div className="col-md-4">
              <label>Width</label>
              <input
                type="text"
                className="form-control"
                value={width}
                placeholder=""
                onChange={e => setWidth(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label>Length</label>
              <input
                type="text"
                className="form-control"
                value={length}
                placeholder=""
                onChange={e => setLength(e.target.value)}
              />
            </div>

            <div className="col-md-4">
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
            <div className="col-md-4">
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
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
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
              </div>
              <div className="col-md-4">
                <img src={imagePath} alt="" style={{ maxWidth: '100%' }}/>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <button className="btn btn-primary m-2" onClick={save}>
              Submit
            </button>
            <button className="btn btn-warning m-2" onClick={update}>
              Update
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-warning m-2" onClick={deleteAll}>
              Delete All Records
            </button>
          </div>
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