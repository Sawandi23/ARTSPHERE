import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaPaintBrush, FaGavel, FaChalkboardTeacher, FaImages, FaUserShield } from "react-icons/fa";

function Nav() {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={"logo.jpg"} alt="Logo" className="logo-img" />
        <span className="logo-text">ARTSPHERE</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/mainart">ART</Link></li>
        <li><Link to="/artist">ARTIST</Link></li>

        <li className="dropdown">
          <button onClick={() => setShowAdminDropdown(!showAdminDropdown)} className="dropdown-toggle">
            <FaUserShield style={{ marginRight: '5px' }} /> ADMIN
          </button>
          {showAdminDropdown && (
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => setShowLoginDropdown(!showLoginDropdown)} className="dropdown-toggle">Login</button>
                {showLoginDropdown && (
                  <ul className="sub-dropdown-menu">
                    <li className="dropdown">
                      <button onClick={() => setActiveSubMenu(activeSubMenu === "ART" ? null : "ART")}>
                        <FaPaintBrush style={{ marginRight: '5px' }} /> ART
                      </button>
                      {activeSubMenu === "ART" && (
                        <ul className="sub-dropdown-menu">
                          <li><Link to="/addart">Add Art</Link></li>
                          <li><Link to="/manageart">Manage Art</Link></li>
                        </ul>
                      )}
                    </li>
                    <li className="dropdown">
                      <button onClick={() => setActiveSubMenu(activeSubMenu === "EXHIBITION" ? null : "EXHIBITION")}>
                        <FaImages style={{ marginRight: '5px' }} /> EXHIBITION
                      </button>
                      {activeSubMenu === "EXHIBITION" && (
                        <ul className="sub-dropdown-menu">
                          <li><Link to="/exhibitions">Manage Exhibitions</Link></li>
                          <li><Link to="/user-exhibitions">Exhibitions - User</Link></li>
                        </ul>
                      )}
                    </li>
                    <li className="dropdown">
                      <button onClick={() => setActiveSubMenu(activeSubMenu === "AUCTION" ? null : "AUCTION")}>
                        <FaGavel style={{ marginRight: '5px' }} /> AUCTION
                      </button>
                      {activeSubMenu === "AUCTION" && (
                        <ul className="sub-dropdown-menu">
                          <li><Link to="/addauction">Add Auction</Link></li>
                          <li><Link to="/manageauction">Manage Auction</Link></li>
                        </ul>
                      )}
                    </li>
                    <li className="dropdown">
                      <button onClick={() => setActiveSubMenu(activeSubMenu === "WORKSHOP" ? null : "WORKSHOP")}>
                        <FaChalkboardTeacher style={{ marginRight: '5px' }} /> WORKSHOP
                      </button>
                      {activeSubMenu === "WORKSHOP" && (
                        <ul className="sub-dropdown-menu">
                          <li><Link to="/adduser">Add Users For Workshops</Link></li>
                          <li><Link to="/users">Manage Workshop Users</Link></li>
                          <li><Link to="/addworkshop">Add Workshops</Link></li>
                          <li><Link to="/workshop">Manage Workshops</Link></li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        <li><Link to="/exhibition">EXHIBITION</Link></li>
        <li><Link to="/auction">AUCTION</Link></li>
        <li><Link to="/workshop">WORKSHOP</Link></li>
       

        <li>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            <span className="cart-text">CART</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
