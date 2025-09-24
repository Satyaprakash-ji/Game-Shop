import { useContext, useEffect } from "react";
import "./Orders.css"
import { FaTrash, FaEye } from "react-icons/fa";
import { OrderContext } from "../../../contexts/OrderContext";

const Orders = () => {

  const { getAllOrders, order } = useContext(OrderContext);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <main className="orders-main-content">
      <h2>All Orders</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Items Qty</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {order?.allOrders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.totalAmount}/-</td>
                <td>{order.status}</td>
                <td>{order.products.reduce((sum, item) => sum + item.qty, 0)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="functional-icons">
                  <button className="icon-btn"><FaEye style={{ color:"gray" }}/></button>
                  <button className="icon-btn"><FaTrash style={{ color:"red" }}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Orders;