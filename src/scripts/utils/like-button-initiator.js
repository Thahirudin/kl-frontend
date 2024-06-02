import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';
import KidsLibraryDbSource from '../data/kidslibrarydb-source';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, buku, userId }) {
    this._likeButtonContainer = likeButtonContainer;
    this._buku = buku;
    this._userId = userId;

    await this._renderButton();
  },

  async _renderButton() {
    if (await this._isBukuExist(this._buku.id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isBukuExist(bukuid) {
    try {
      const response = await KidsLibraryDbSource.getFavoritByUserId(this._userId);
      const bukuIdNumber = Number(bukuid);
      const exists = response.some((favorit) => favorit.bukuId === bukuIdNumber);
      return exists;
    } catch (error) {
      console.error('Error checking if book exists:', error);
      return false;
    }
  },

  async _addToFavorites() {
    const data = {
      userId: this._userId,
      bukuId: this._buku.id,
    };
    try {
      const result = await KidsLibraryDbSource.addFavorit(data);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  },

  async _removeFromFavorites() {
    try {
      const response = await KidsLibraryDbSource.getFavoritByUserId(this._userId);
      console.log('Favorites for removal:', response);
      const bukuIdNumber = Number(this._buku.id);
      const favorite = response.find((fav) => fav.bukuId === bukuIdNumber);
      if (favorite) {
        const deleteResponse = await KidsLibraryDbSource.removeFavoritById(favorite.id);
        console.log(deleteResponse);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  async _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._addToFavorites();
      this._renderButton();
    });
  },

  async _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._removeFromFavorites();
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
