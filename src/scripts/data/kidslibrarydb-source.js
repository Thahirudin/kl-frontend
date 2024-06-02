import API_ENDPOINT from '../globals/api-endpoint';

class KidsLibraryDbSource {
  static async getAllBuku() {
    const response = await fetch(API_ENDPOINT.LISTBUKU);
    const responseJson = await response.json();
    return responseJson.buku;
  }

  static async getBukuById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.DETAILBUKU(id), {
      headers: {
        token: `${token}`,
      },
    });
    const responseJson = await response.json();
    return responseJson.buku;
  }

  static async addFavorit(data) {
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(API_ENDPOINT.ADDFAVORIT, options);
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async getFavoritByUserId(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.FAVORITBYUSERID(id), {
      headers: {
        token: `${token}`,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || 'Failed to fetch favorite books');
    }
    const responseJson = await response.json();
    return responseJson.favorit;
  }

  static async removeFavoritById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.REMOVEFAVORITBYID(id), {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || 'Failed to fetch favorite books');
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async login(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(API_ENDPOINT.LOGIN, options);
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async getUserById(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.DETAILUSER(id), {
      headers: {
        token: `${token}`,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || 'User Tidak Ditemukan');
    }
    const responseJson = await response.json();
    return responseJson.user;
  }
}

export default KidsLibraryDbSource;
