import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  email: string;
  role: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  profileImage: string;
}

const AddUserComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'Manager', // Default role
    username: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic field validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.role.trim() ||
      !formData.username.trim() ||
      !formData.profileImage.trim()
    ) {
      setError('Please fill all the fields.');
      return;
    }

    // Only validate password if role is Admin or Manager
    if (formData.role === 'Admin' || formData.role === 'Manager') {
      if (!formData.password || !formData.confirmPassword) {
        setError('Please enter and confirm the password.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: No token found.');
        return;
      }

      // Exclude password fields if role is Staff
      const payload = { ...formData };
      if (formData.role === 'Staff') {
        delete payload.password;
        delete payload.confirmPassword;
      }

      const response = await axios.post(
        'http://localhost:5000/api/users/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('User added successfully!');
      setFormData({
        name: '',
        email: '',
        role: 'Manager',
        username: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
      });
    } catch (error: any) {
      console.error('Error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Error adding user. Please try again.');
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New User</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          {(formData.role === 'Admin' || formData.role === 'Manager') && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Re-enter Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter password"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
            {formData.profileImage && (
              <div className="mt-2">
                <img
                  src={formData.profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddUserComponent;
