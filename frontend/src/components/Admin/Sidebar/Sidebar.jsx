import { Link, useLocation } from "react-router-dom";
import { FaBox, FaPlus, FaUsers, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({isMenuOpen}) => {
  const location = useLocation();

  return (
    <aside className={`admin-sidebar ${isMenuOpen ? "open" : "closed"}`}>
      <Link to="/admin" className="sidebar-title">
        <FaTachometerAlt className="sidebar-icon" /> Admin Dashboard
      </Link>
      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <p className="sidebar-section-title">PRODUCTS</p>
        <Link to="/admin/products" className={`sidebar-link ${location.pathname === "/admin/products" ? "active" : ""}`}>
          <FaBox className="sidebar-link-icon" /> All Products
        </Link>
        <Link to="/admin/products/create" className={`sidebar-link ${location.pathname === "/admin/products/create" ? "active" : ""}`}>
          <FaPlus className="sidebar-link-icon" /> Create Product
        </Link>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">USERS</p>
        <Link to="/admin/users" className={`sidebar-link ${location.pathname === "/admin/users" ? "active" : ""}`}>
          <FaUsers className="sidebar-link-icon" /> All Users
        </Link>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">ORDERS</p>
        <Link to="/admin/orders" className={`sidebar-link ${location.pathname === "/admin/orders" ? "active" : ""}`}>
          <FaShoppingCart className="sidebar-link-icon" /> All Orders
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;