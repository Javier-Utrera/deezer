import { defineStore } from "pinia";
import { toHandlers } from "vue";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    playlist: [],  // 🔥 Lista de canciones favoritas
    currentTrack: null,  // 🔥 Canción en reproducción
  }),

  getters: {
    // 🔥 Verifica si una canción está en favoritos
    isFavorite: (state) => (id) => {
      return state.playlist.some((song) => song.id === id);
    },
  },

  actions: {
    // 🔹 Agregar canción a la lista
    addSong(song) {
      if (!this.isFavorite(song.id)) {
        this.playlist.push(song);
        if (!this.currentTrack) {
          this.setCurrentTrack(song); // 🔥 Si no hay canción reproduciéndose, pon la primera
        }
      }
    },

    // 🔹 Eliminar canción de la lista
    removeSong(songId) {
      this.playlist = this.playlist.filter((song) => song.id !== songId);
    },

    // 🔹 Vaciar la playlist
    clearPlaylist() {
      this.playlist = [];
      this.currentTrack=null;
    },

    // 🔥 Asegurar que el estado se actualiza correctamente
    setCurrentTrack(track) {
      if (!track) return;
      console.log("🔊 Cambiando canción a:", track);
      this.currentTrack = { ...track }; // ✅ Forzar reactividad en Vue
    },

    // 🔥 Reproducir la siguiente canción en la lista
    playNext() {
      if (this.playlist.length > 0) {
        const currentIndex = this.playlist.findIndex((s) => s.id === this.currentTrack?.id);
        const nextIndex = (currentIndex + 1) % this.playlist.length;
        this.currentTrack = this.playlist[nextIndex];
      }
    },

    // 🔥 Nueva función para actualizar el orden de la playlist
    setPlaylistOrder(newOrder) {
      this.playlist = newOrder; 
    }

  },
});
