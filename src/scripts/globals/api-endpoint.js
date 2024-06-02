import CONFIG from './config';

const API_ENDPOINT = {
  LISTBUKU: `${CONFIG.BASE_URL}/buku`,
  DETAILBUKU: (id) => `${CONFIG.BASE_URL}/buku/${id}`,
  ADDFAVORIT: `${CONFIG.BASE_URL}/favorit`,
  FAVORITBYUSERID: (id) => `${CONFIG.BASE_URL}/favorit/${id}`,
  REMOVEFAVORITBYID: (id) => `${CONFIG.BASE_URL}/favorit/${id}`,
  LOGIN: `${CONFIG.BASE_URL}/users/login`,
  DETAILUSER: (id) => `${CONFIG.BASE_URL}/users/${id}`,
};

export default API_ENDPOINT;
