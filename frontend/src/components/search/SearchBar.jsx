import React from 'react';

const SearchBar = () => {
  const searchBarStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ccc',
    width: '100%',
  };

  const searchHeaderStyles = {
    padding: '10px',
    marginRight: '2rem',
    fontSize: '2rem',
  };

  const searchInputGroupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Add space between button and input
    flexGrow: 1,
  };

  const searchInputStyles = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '',
    flexGrow: 1,
  };

  const searchButtonStyles = {
    marginLeft: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={searchBarStyles} className="search-bar">
      <label type="text" style={searchHeaderStyles} id="search-header">
        GarnatzLLC
      </label>
      <div style={searchInputGroupStyles} className="search-input-group">
        <input
          type="text"
          style={searchInputStyles}
          id="search-input"
          placeholder="Search..."
        />
        <button style={searchButtonStyles} id="search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;