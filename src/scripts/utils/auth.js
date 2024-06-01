// utils/auth.js
const isUserLoggedIn = () => !!localStorage.getItem('token');

export default isUserLoggedIn;
