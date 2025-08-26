import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
    
  const { loginData, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <Loader />;
  }

  if (!loginData.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (loginData?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
