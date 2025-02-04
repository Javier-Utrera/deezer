<template>
  <div id="app">
    <div class="layout">
      <!-- Botón de hamburguesa -->
      <button class="btn btn-primary menu-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Menú -->
      <Menu :isOpen="isMenuOpen" />

      <!-- Contenido principal -->
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <!-- Mostrar el reproductor solo si hay una canción en reproducción -->
      <MusicPlayer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites.js";
import Menu from "./components/Menu.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

const isMenuOpen = ref(true);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 📌 Importar el store de favoritos para detectar la canción en reproducción
const store = useFavoritesStore();
const currentTrack = computed(() => store.currentTrack);
</script>

<style lang="scss">

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  background: radial-gradient(circle at top, #333 20%, #000 100%);
  width: 100%;
  height: 100%;
  color: white;
  overflow-x: hidden;
}

.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.menu-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  background: #007bff;
  border: none;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2000;
  transition: background 0.3s ease-in-out;
}

.menu-toggle:hover {
  background: #0056b3;
}

.main-content {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
}
</style>
