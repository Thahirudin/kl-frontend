import API_ENDPOINT from '../globals/api-endpoint';

class KidsLibraryDbSource {
  static async getAllBuku() {
    const response = await fetch(API_ENDPOINT.LISTBUKU);
    const responseJson = await response.json();
    return responseJson;
  }

  static async tambahBuku(data) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('judul', data.judul);
    formData.append('kategori', data.kategori);
    formData.append('ringkasan', data.ringkasan);
    formData.append('penulis', data.penulis);
    formData.append('image', data.image); // Ini adalah file gambar
    formData.append('readUrl', data.readUrl);

    const response = await fetch(API_ENDPOINT.TAMBAHBUKU, {
      method: 'POST',
      headers: {
        token,
      },
      body: formData, // Mengirimkan FormData sebagai body
    });

    const responseJson = await response.json();
    if (!response.ok) {
      // Tangani kesalahan jika terjadi
      if (Array.isArray(responseJson.messages)) {
        throw new Error(responseJson.messages.join(', '));
      } else {
        throw new Error(responseJson.message || 'Gagal menambahkan buku');
      }
    }
    return responseJson;
  }

  static async editBuku(data) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('judul', data.judul);
    formData.append('kategori', data.kategori);
    formData.append('ringkasan', data.ringkasan);
    formData.append('penulis', data.penulis);
    formData.append('image', data.image); // Ini adalah file gambar
    formData.append('readUrl', data.readUrl);

    const response = await fetch(API_ENDPOINT.EDITBUKU(data.id), {
      method: 'PUT',
      headers: {
        token,
      },
      body: formData, // Mengirimkan FormData sebagai body
    });

    const responseJson = await response.json();
    if (!response.ok) {
      // Tangani kesalahan jika terjadi
      if (Array.isArray(responseJson.messages)) {
        throw new Error(responseJson.messages.join(', '));
      } else {
        throw new Error(responseJson.message || 'Gagal menambahkan buku');
      }
    }
    return responseJson;
  }

  static async hapusBuku(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.HAPUSBUKU(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      // Tangani kesalahan jika terjadi
      if (Array.isArray(responseJson.messages)) {
        throw new Error(responseJson.messages.join(', '));
      } else {
        throw new Error(responseJson.message || 'Gagal Hapus buku');
      }
    }
    return responseJson;
  }

  static async detailBuku(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.DETAILBUKU(id), {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      // Handle both array and single string error messages
      if (Array.isArray(responseJson.messages)) {
        throw new Error(responseJson.messages.join(', '));
      } else {
        throw new Error(responseJson.message || 'Buku Tidak Ditemukan');
      }
    }
    return responseJson.buku;
  }

  static async tambahUser(data) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.TAMBAHUSER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      // Handle both array and single string error messages
      if (Array.isArray(responseJson.messages)) {
        throw new Error(responseJson.messages.join(', '));
      } else {
        throw new Error(responseJson.message || 'Failed to add user');
      }
    }
    return responseJson;
  }

  static async loginUser(data) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.LOGINUSER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.messages);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async editUser(data, id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.editUser(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailUser(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.DETAILUSER(id), {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson);
    }
    const responseJson = await response.json();
    return responseJson.user;
  }

  static async getAllUser() {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.GETUSER, {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    const responseJson = await response.json();
    return responseJson.users;
  }

  static async hapusUser(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.HAPUSUSER(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async tambahFavorit(data) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.TAMBAHFAVORIT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async hapusFavorit(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.HAPUSFAVORIT(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson);
    }
    const responseJson = await response.json();
    return responseJson;
  }

  static async getFavoritByUserId(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINT.FAVORITBYUSERID(id), {
      headers: {
        token,
      },
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || 'Failed to fetch favorite books');
    }
    const responseJson = await response.json();
    return responseJson.favorit;
  }
}

export default KidsLibraryDbSource;
