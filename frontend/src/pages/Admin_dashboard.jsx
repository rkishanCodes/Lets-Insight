import React, { useState, useEffect } from "react";
import axios from "axios";
import './pages.css'

const Admin_dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/v0/admin/users"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
  
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  async function handleDelete(userId) {
    try {
      await axios.delete(`http://localhost:5002/api/v0/admin/${userId}`);
      fetchUsers();
    } catch (err) {
      setError("Error deleting user");
    }
  }
};

export default Admin_dashboard;


