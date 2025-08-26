import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import { useEffect } from "react";
import AdminNavigationBar from "../components/Admin/AdminNavigationBar/AdminNavigationBar";

const AdminLayout = () => {

    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <header>
          <AdminNavigationBar />
        </header>
        <div style={{padding: "0 10px"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
