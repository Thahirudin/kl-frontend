import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false; // Jika token tidak ada, pengguna belum login

  try {
    const decodedToken = jwtDecode(token);
    // Memeriksa apakah token sudah kedaluwarsa
    const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
    if (decodedToken.exp < currentTime) return false;
    return true; // Jika token ada dan masih valid, pengguna sudah login
  } catch (error) {
    console.error('Invalid token', error);
    return false; // Jika terjadi kesalahan dalam dekode token, pengguna belum login
  }
};

export default isUserLoggedIn;
