import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
      <nav className="custom-navbar">
          <ul className="nav-list">
              <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/">
                      Home
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/browse-inventory' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/browse-inventory">
                      Browse Inventory
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/order-information' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/order-information">
                      Order Information
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/map-purchase' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/map-purchase">
                      Map Purchase
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/about-product' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/about-product">
                      About
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/reviews' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/reviews">
                      Reviews
                  </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/owner-management' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/owner-management">
                      Manage Inventory
                  </Link>
              </li>
          </ul>
      </nav>
  );
}
export default Navigation;