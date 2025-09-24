import { useContext, useEffect } from "react";
import "./Users.css"
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";

const Users = () => {

  const { getAllUsers, allUsers } = useContext(AuthContext);

  useEffect(() => {
    getAllUsers();
  },[]);

  return (
    <main className="users-main-content">
      <h2>All Users</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="functional-icons">
                  <button className="icon-btn"><FaEdit style={{ color:"gray" }}/></button>
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

export default Users;