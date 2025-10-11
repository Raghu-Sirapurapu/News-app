import axios from './axios';

 const registerUser = async (userData) => {
  return await axios.post('/auth/register', userData);
};
 
const loginUser = async (userData) => {
  return await axios.post('/auth/login', userData);
};
 
const forgotPassword = async (emailData) => {
  return await axios.post('/auth/forgot-password', emailData);
};

// Reset password with token
const resetPassword = async (token, newPasswordData) => {
  return await axios.post(`/auth/reset-password/${token}`, newPasswordData);
};

const changePassword = async (passwordData) => {
  return await axios.put('/auth/change-password', passwordData);
};

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    changePassword
}