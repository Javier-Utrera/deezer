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
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref} from "vue";
import Menu from "./components/Menu.vue";

const isMenuOpen = ref(true);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="scss">

/* Contenedor principal con capa de fondo */
#app {
  background: radial-gradient(circle at top, #333 20%, #000 100%);
  position: relative;
  width: 100vw;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
}

/* Layout */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Botón de menú */
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

/* Contenido principal */
.main-content {
  flex-grow: 1;
  padding: 20px;
}
</style>
