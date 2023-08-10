import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();

  return (
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/browse-inventory' ? 'active' : ''}>
          <Link to="/browse-inventory">Browse Inventory</Link>
        </li>
        <li className={location.pathname === '/order-information' ? 'active' : ''}>
          <Link to="/order-information">Order Information</Link>
        </li>
        <li className={location.pathname === '/order-information' ? 'active' : ''}>
          <Link to="/map-purchase">Map Purchase</Link>
        </li>
        <li className={location.pathname === '/order-information' ? 'active' : ''}>
          <Link to="/about-product">About</Link>
        </li>
        <li className={location.pathname === '/order-information' ? 'active' : ''}>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className={location.pathname === '/order-information' ? 'active' : ''}>
          <Link to="/owner-management">Manage Inventory</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;