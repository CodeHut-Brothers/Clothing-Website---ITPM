import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, X, Users, UserPlus, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

// Simulate ToastContainer for demonstration
const ToastContainer = () => <div id="toast-container"></div>;
const toast = {
  success: (msg) => console.log('Success:', msg),
  error: (msg) => console.log('Error:', msg)
};

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
        // Using fetch instead of axios
        const response = await fetch('http://localhost:5000/api/users/viewusers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
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
      // Using fetch instead of axios
      const response = await fetch(
        `http://localhost:5000/api/users/edit/${editUser._id}`,
        {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify(editUser)
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      const updatedUser = await response.json();

      // Update UI
      setUsers(users.map((user) => (user._id === editUser._id ? updatedUser : user)));
      toast.success('User updated successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  // Handle Delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      try {
        // Using fetch instead of axios
        const response = await fetch(`http://localhost:5000/api/users/delete/${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        setUsers(users.filter((user) => user._id !== userId));
        toast.success('User deleted successfully!');
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

  // Generate and download PDF report
  const handleDownloadReport = () => {
    try {
      // Filter users based on search term if any
      const usersToExport = searchTerm ? filteredUsers : users;
      
      // Create PDF document in landscape mode
      const doc = new jsPDF('landscape');
      
      // Report title and metadata
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("User Management Report", 15, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 28);
      doc.text(`Total Users: ${usersToExport.length}`, 15, 34);
      
      // Add simple divider line
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(15, 38, 280, 38);
      
      // Table setup
      const headers = ["Name", "Email", "Username", "Role"];
      const colPositions = [20, 80, 150, 220];
      const rowHeight = 10;
      let yPos = 50;
      
      // Table header - simple underlined text
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      headers.forEach((header, i) => {
        doc.text(header, colPositions[i], yPos);
        doc.line(colPositions[i], yPos + 2, colPositions[i] + (i === headers.length - 1 ? 60 : 70), yPos + 2);
      });
      
      yPos += rowHeight;
      
      // Table body - clean and simple
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      usersToExport.forEach((user, index) => {
        // Check for page break
        if (yPos > 180) {
          doc.addPage('landscape');
          yPos = 20;
          
          // Redraw header on new page
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          headers.forEach((header, i) => {
            doc.text(header, colPositions[i], yPos);
            doc.line(colPositions[i], yPos + 2, colPositions[i] + (i === headers.length - 1 ? 60 : 70), yPos + 2);
          });
          
          yPos += rowHeight;
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
        }
        
        // User data
        doc.text(user.name || "-", colPositions[0], yPos);
        doc.text(user.email || "-", colPositions[1], yPos);
        doc.text(user.username || "-", colPositions[2], yPos);
        doc.text(user.role || "-", colPositions[3], yPos);
        
        yPos += rowHeight;
      });
      
      // Simple footer
      doc.setFontSize(8);
      doc.text("User Management System Report", 15, 200);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, 260, 200);
      
      // Save PDF
      doc.save(`users_report_${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success('PDF report downloaded successfully!');
    } catch (error) {
      toast.error('Error generating PDF report');
      console.error('Error generating PDF report:', error);
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

  // Role badge color mapping
  const getRoleBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p className="font-semibold">{error}</p>
        <p>Please try refreshing the page</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleDownloadReport}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              Download PDF Report
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors">
              <UserPlus className="h-5 w-5 mr-2" />
              Add New User
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, username or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        {/* User Cards for Mobile */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex justify-end space-x-2">
                <button
                  className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  onClick={() => handleEdit(user)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  className="flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  onClick={() => handleDelete(user._id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Table for Desktop */}
        <div className="hidden md:block overflow-hidden bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <span className="flex items-center">
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <span className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No users found matching your search</p>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Edit User</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editUser.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsersPage;