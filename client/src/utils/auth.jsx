import {jwtDecode} from 'jwt-decode';

export const getAuthUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch (err) {
    return null;
  }
};


export const isAdmin = () => {
  const role = getAuthUser()?.role;
  return role === 'admin' || role === 'superadmin';
};
export const isLoggedIn = () => !!getAuthUser();
