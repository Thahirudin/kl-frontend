import API_ENDPOINT from '../globals/api-endpoint';

class KidsLibraryDbSource {
  static async getAllBuku() {
    const response = await fetch(API_ENDPOINT.LISTBUKU);
    const responseJson = await response.json();
    return responseJson;
  }
}

export default KidsLibraryDbSource;
