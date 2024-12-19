// src/components/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUserAlt, FaCog } from "react-icons/fa";
import "./SideNavBar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {!isOpen && (
        <div className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li className={({ isActive }) => (isActive ? "active-li" : "gfc")}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              onClick={toggleSidebar}
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li className={({ isActive }) => (isActive ? "active-li" : "")}>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              onClick={toggleSidebar}
            >
              <FaUserAlt />
              <span>About</span>
            </NavLink>
          </li>
          <li className={({ isActive }) => (isActive ? "active-li" : "")}>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "not-active")}
              onClick={toggleSidebar}
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Navbar;
