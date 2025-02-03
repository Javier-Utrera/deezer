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

    <MusicPlayer/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "./components/Menu.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

const isMenuOpen = ref(true);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="scss">
/* 🔹 Asegurar que la app ocupa toda la pantalla */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* 🔹 Contenedor principal */
#app {
  background: radial-gradient(circle at top, #333 20%, #000 100%);
  width: 100%;
  height: 100%;
  color: white;
  overflow-x: hidden;
}

/* 🔹 Layout flexible */
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 60px; /* 🔥 Espacio reservado para el reproductor */
}

/* 🔹 Botón de menú */
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

/* 🔹 Contenido principal */
.main-content {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
}

/* 🔹 Estilos del Reproductor */
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Asegura que está encima de otros elementos */
}
</style>
