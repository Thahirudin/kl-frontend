import CONFIG from './config';

const API_ENDPOINT = {
  LISTBUKU: `${CONFIG.BASE_URL}/buku`,
  TAMBAHBUKU: `${CONFIG.BASE_URL}/buku`,
  EDITBUKU: (id) => `${CONFIG.BASE_URL}/buku/${id}`,
  HAPUSBUKU: (id) => `${CONFIG.BASE_URL}/buku/${id}`,
  DETAILBUKU: (id) => `${CONFIG.BASE_URL}/buku/${id}`,

  TAMBAHUSER: `${CONFIG.BASE_URL}/users/register`,
  LOGINUSER: `${CONFIG.BASE_URL}/users/login`,
  EDITUSER: (id) => `${CONFIG.BASE_URL}/users/edit/${id}`,
  DETAILUSER: (id) => `${CONFIG.BASE_URL}/users/${id}`,
  GETUSER: `${CONFIG.BASE_URL}/users`,
  HAPUSUSER: (id) => `${CONFIG.BASE_URL}/users/${id}`,

  TAMBAHFAVORIT: `${CONFIG.BASE_URL}/favorit`,
  HAPUSFAVORIT: (id) => `${CONFIG.BASE_URL}/favorit/${id}`,
  FAVORITBYUSERID: (id) => `${CONFIG.BASE_URL}/favorit/${id}`,
};

export default API_ENDPOINT;
