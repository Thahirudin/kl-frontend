/* eslint-disable no-alert */
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

  async _isBukuExist(bukuId) {
    try {
      const response = await KidsLibraryDbSource.getFavoritByUserId(this._userId);
      const numberBukuId = Number(bukuId);
      return response.some((favorite) => favorite.bukuId === numberBukuId);
    } catch (error) {
      console.error('Error checking if book exists:', error);
      return false;
    }
  },

  async _addToFavorites() {
    const payload = {
      userId: this._userId,
      bukuId: this._buku.id,
    };
    try {
      await KidsLibraryDbSource.tambahFavorit(payload);
    } catch (error) {
      alert(`Login gagal: ${error.message}`);
    }
  },

  async _removeFromFavorites() {
    try {
      const response = await KidsLibraryDbSource.getFavoritByUserId(this._userId);
      const numberBukuId = Number(this._buku.id);
      const favorite = response.find((fav) => fav.bukuId === numberBukuId);
      if (favorite) {
        await KidsLibraryDbSource.hapusFavorit(favorite.id);
      }
    } catch (error) {
      alert(`Login gagal: ${error.message}`);
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
