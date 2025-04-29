import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/viewusers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Edit button click
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  // Handle Input Change in Modal
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  // Handle Update user
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/edit/${editUser._id}`,
        editUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Update UI
      setUsers(users.map((user) => (user._id === editUser._id ? response.data : user)));
      toast.success('User updated successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  // Handle Delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        setUsers(users.filter((user) => user._id !== userId));
        toast.success('User deleted successfully!');
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowercasedSearchTerm) ||
      user.username.toLowerCase().includes(lowercasedSearchTerm) ||
      user.role.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* User Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">#</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {/* Edit Button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={editUser.username}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Role:</label>
            <select
              name="role"
              value={editUser.role}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            >
              <option value="user">Staff</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsersPage;
