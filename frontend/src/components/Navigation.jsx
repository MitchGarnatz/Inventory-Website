import React from 'react';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="templateNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Template 1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Template 2
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Template 3
            </a>
          </li>
          {/* Add more templates as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;