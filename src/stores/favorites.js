import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    playlist: [], // Lista de canciones favoritas
  }),
  getters: {
    // Verifica si una canción está en la playlist
    isFavorite: (state) => (id) => {
      return state.playlist.some((song) => song.id === id);
    },
  },
  actions: {
    // Agrega una canción a la playlist si no está repetida
    addSong(song) {
      if (!this.isFavorite(song.id)) {
        this.playlist.push(song);
      }
    },
    // Elimina una canción de la playlist
    removeSong(songId) {
      this.playlist = this.playlist.filter((song) => song.id !== songId);
    },
    // Vacía completamente la playlist
    clearPlaylist() {
      this.playlist = [];
    }
  },
});
