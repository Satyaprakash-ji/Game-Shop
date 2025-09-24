import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import AdminNavigationBar from "../components/Admin/AdminNavigationBar/AdminNavigationBar";

const AdminLayout = () => {

   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);


   const toggleMenu = () => {
     setIsMenuOpen((prev) => !prev);
   };

   useEffect(() => {
     window.scrollTo(0, 0);
   }, [location]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar isMenuOpen={isMenuOpen} />
      <div style={{ flex: 1 }}>
        <header>
          <AdminNavigationBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </header>
        <div style={{padding: "0 10px"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
