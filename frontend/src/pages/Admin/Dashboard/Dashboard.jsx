import { useContext, useEffect } from "react";
import "./Dashboard.css";
import { FaBox, FaShoppingCart, FaRupeeSign, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { ProductContext } from "../../../contexts/ProductContext";
import { OrderContext } from "../../../contexts/OrderContext";

const Dashboard = () => {
  const { products } = useContext(ProductContext);
  const { getAllOrders, order } = useContext(OrderContext);
  
  const totalProducts = products?.productsData?.products?.length;
  const totalOrders = order?.allOrders?.length;
  const totalRevenue = order?.allOrders?.reduce((acc, crr) => acc += crr.totalAmount, 0)
  const inStock = products?.productsData?.products?.length;
  const outOfStock = 0;

  
  const Card = ({ icon, title, value }) => (
    <div className="db-card">
      <div className="db-icon">{icon}</div>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
  
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <main className="main-content">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-cards">
        <Card icon={<FaBox />} title="Total Products" value={totalProducts}/>
        <Card icon={<FaShoppingCart />} title="Total Orders" value={totalOrders}/>
        <Card icon={<FaRupeeSign />} title="Total Revenue" value={totalRevenue + "/-"}/>
        <Card icon={<FaExclamationCircle />} title="Out of Stock" value={outOfStock}/>
        <Card icon={<FaCheckCircle />} title="In Stock" value={inStock}/>
      </div>
    </main>
  );
}

export default Dashboard;
