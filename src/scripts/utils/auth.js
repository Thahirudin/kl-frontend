import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false; // Jika token tidak ada, pengguna belum login

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) return false;
    return true;
  } catch (error) {
    console.error('Invalid token', error);
    return false;
  }
};

export default isUserLoggedIn;
