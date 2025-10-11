// apis/admin.js
import axios from './axios';

// Get Pending News
export const getPendingNews = async (token) => {
  return await axios.get('/admin/news/pending', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get Approved News
export const getApprovedNews = async (token) => {
  return await axios.get('/admin/news/approved', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Approve News
export const approveNews = async (newsId, token) => {
  return await axios.put(`/admin/news/${newsId}/approve`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Reject News (Delete)
export const rejectNews = async (newsId, token) => {
  return await axios.delete(`/admin/news/${newsId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get All Users
export const getAllUsers = async (token) => {
  return await axios.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Make Admin
export const makeAdmin = async (userId, role, department, token) => {
  return await axios.put(`/admin/users/${userId}/make-admin`, {role, department}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//Make super admin
export const makeSuperAdmin = async (userId, token) => {
  return await axios.put(`/admin/users/${userId}/make-superadmin`, { role: 'superadmin' }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Remove Admin
export const removeAdmin = async (userId, token) => {
  return await axios.put(`/admin/users/${userId}/remove-admin`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeSuperAdmin = async (userId, token) => {
  return await axios.put(`/admin/users/${userId}/remove-superadmin`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete User
export const deleteUser = async (userId, token) => {
  return await axios.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
