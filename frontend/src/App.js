// App.js
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import "./App.css";

// Element Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Templates
import Navigation from './components/nav/Navigation'; 
import HomeTemplate from './components/templates/HomeTemplate';
import InventoryTemplate from './components/templates/InventoryTemplate'; 
import OrderTemplate from './components/templates/OrderTemplate'; 
import MapPurchaseTemplate from './components/templates/MapPurchaseTemplate';
import AboutTemplate from './components/templates/AboutTemplate';
import ReviewTemplate from './components/templates/ReviewTemplate';
import ManagementTemplate from './components/templates/ManagementTemplate';
import SearchBar from "./components/search/SearchBar";

function App() {
  return (
    <body>
      <header>
        <SearchBar />
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomeTemplate />} />
              <Route path="/browse-inventory" element={<InventoryTemplate />} />
              <Route path="/order-information" element={<OrderTemplate />} />
              <Route path="/map-purchase" element={<MapPurchaseTemplate />} />
              <Route path="/about-product" element={<AboutTemplate />} />
              <Route path="/reviews" element={<ReviewTemplate />} />
              <Route path="/owner-management" element={<ManagementTemplate />} />
            </Routes>
        </Router>
      </header>
    </body>
  );
}

export default App;