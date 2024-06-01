import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const API_URL = 'https://kids-library-production.up.railway.app/favorit';

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
      const response = await fetch(`${API_URL}/${this._userId}`);
      if (!response.ok) {
        console.error('Failed to fetch favorites:', response.statusText);
        return false;
      }
      const favorites = await response.json();
      return favorites.some((favorite) => favorite.bukuId === bukuId);
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to add to favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  async _removeFromFavorites() {
    try {
      const response = await fetch(`${API_URL}/${this._userId}`);
      if (!response.ok) {
        console.error('Failed to fetch favorites:', response.statusText);
        return;
      }
      const favorites = await response.json();
      const favorite = favorites.find((fav) => fav.bukuId === this._buku.id);
      if (favorite) {
        const deleteResponse = await fetch(`${API_URL}/${favorite.id}`, {
          method: 'DELETE',
        });

        if (!deleteResponse.ok) {
          const errorMessage = await deleteResponse.text();
          console.error('Failed to remove from favorites:', errorMessage);
        }
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
