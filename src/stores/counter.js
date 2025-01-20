import { defineStore } from 'pinia';

export const useUserStore = defineStore('counter', {
  state: () => ({
    playlist : []
  }),
  getters: {
    getTotal: (state) => playlist.lenght
  },
  actions: {
    // Acción para actualizar el email
    addSong(song) {
      this.playlist.push(song)
    },
    // Acción para limpiar el email
    deleteSong(song) {
      this.playlist.splice(this.playlist.indexOf(song),1)
    },
  },
});
