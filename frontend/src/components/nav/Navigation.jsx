import React from 'react';
import { Link } from 'react-router-dom';
import { useState} from "react";
import { useLocation } from 'react-router-dom';
import Header from './Header';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
        <nav className="custom-navbar navbar navbar-expand-lg navbar-light bg-blue">
            <button
                className="navbar-toggler"
                type="button"
                onClick={handleMenuToggle}
                aria-expanded={isMenuOpen}
            >
                <span className="navbar-toggler-icon"></span>
                <label>Menu</label>
            </button>
            
            <Header/>
            <div
                className={`collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`}
                id="navbarNav"
            >
                <ul className="nav-list navbar-nav">
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/"
                            onClick={handleLinkClick}
                        >
                        <span className="nav-icon">🏠</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/browse-inventory' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/browse-inventory"
                            onClick={handleLinkClick}
                        >
                            Browse Inventory
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/order-information' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/order-information"
                            onClick={handleLinkClick}
                        >
                            Order Information
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/map-purchase' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/map-purchase"
                            onClick={handleLinkClick}
                        >
                            Map Purchase
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/about-product' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/about-product"
                            onClick={handleLinkClick}
                        >
                            About
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/reviews' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/reviews"
                            onClick={handleLinkClick}
                        >
                            Reviews
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/owner-management' ? 'active' : ''}`}>
                        <Link 
                            className="nav-link" 
                            to="/owner-management"
                            onClick={handleLinkClick}
                        >
                            Manage Inventory
                        </Link>
                    </li>
                {/* Repeat for other navigation items */}
                </ul>
            </div>
        </nav>
    </div>
  );
}

export default Navigation;




