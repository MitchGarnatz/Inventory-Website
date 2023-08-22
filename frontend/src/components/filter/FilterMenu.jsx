import React from "react";
import "./FilterMenu.css"; // Import your CSS file for styling

const FilterMenu = ({
    isOpen,
    onClose,
    filterNames,
    filterLocations,
    filteredAttributes,
    filteredLocations,
    minLength,
    maxLength,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minPrice,
    maxPrice,
    handleCheckboxChange,
    handleLocationCheckboxChange,
    handleMinLengthChange,
    handleMaxLengthChange,
    handleMinWidthChange,
    handleMaxWidthChange,
    handleMinHeightChange,
    handleMaxHeightChange,
    handleMinWeightChange,
    handleMaxWeightChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSubmit,
    handleResetFilters,
  }) => {
    return (
      <div>
        {/* Overlay */}
        <div className={`filter-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
  
        {/* Filter menu */}
        <div className={`filter-menu ${isOpen ? "open" : ""}`}>
          <div className="menu-content">
            Hello World, Goodluck with filing this menu.





            <div className="row">
        <div className="col-md-12 p-3">
          <div className="form-group px-3">
            <label>Filter by Name:</label>
            {filterNames.map(name => (
              <div key={name} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filteredAttributes.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                />
                <label className="form-check-label">{name}</label>
              </div>
            ))}
          </div>
          <div className="form-group px-3 ">
            <label>Filter by Location:</label>
            {filterLocations.map(location => (
              <div key={location} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filteredLocations.includes(location)}
                  onChange={() => handleLocationCheckboxChange(location)}
                />
                <label className="form-check-label">{location}</label>
              </div>
            ))}
          </div>
          <div className="form-group px-3">
            <label>Filter by Length:</label>
            <input
              type="number"
              className="form-control"
              value={minLength}
              onChange={handleMinLengthChange}
              placeholder="Min Length"
            />
            <input
              type="number"
              className="form-control"
              value={maxLength}
              onChange={handleMaxLengthChange}
              placeholder="Max Length"
            />
          </div>
          <div className="form-group px-3">
            <label>Filter by Width:</label>
            <input
              type="number"
              className="form-control"
              value={minWidth}
              onChange={handleMinWidthChange}
              placeholder="Min Width"
            />
            <input
              type="number"
              className="form-control"
              value={maxWidth}
              onChange={handleMaxWidthChange}
              placeholder="Max Width"
            />
          </div>
          <div className="form-group px-3">
            <label>Filter by Height:</label>
            <input
              type="number"
              className="form-control"
              value={minHeight}
              onChange={handleMinHeightChange}
              placeholder="Min Height"
            />
            <input
              type="number"
              className="form-control"
              value={maxHeight}
              onChange={handleMaxHeightChange}
              placeholder="Max Height"
            />
          </div>
          <div className="form-group px-3">
            <label>Filter by Weight:</label>
            <input
              type="number"
              className="form-control"
              value={minWeight}
              onChange={handleMinWeightChange}
              placeholder="Min Weight"
            />
            <input
              type="number"
              className="form-control"
              value={maxWeight}
              onChange={handleMaxWeightChange}
              placeholder="Max Weight"
            />
          </div>
          <div className="form-group px-3">
            <label>Filter by Price:</label>
            <input
              type="number"
              className="form-control"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min Price"
            />
            <input
              type="number"
              className="form-control"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max Price"
            />
          </div>
          <div className="row form-group px-3">
            <div className="col-md-8"></div>
            <div className="col-md-4 form-group d-flex justify-content-between px-3">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Apply Filters
              </button>
              <button className="btn btn-secondary" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>







            <button
                  type="button"
                  className="btn btn-danger mx-2 close-button"
                  onClick={onClose}
                >
                  Close
            </button>
            {/* Add your filter form and controls here */}
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterMenu;