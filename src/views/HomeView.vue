<template>
  <div class="home-container" :style="{ backgroundImage: backgroundStyle }">
    <!-- Barra de búsqueda -->
    <SearchBar class="p-5" />

    <!-- Carrusel -->
    <Carrusel class="pb-5" @updateImage="updateBackground" />

    <div class="container mt-4">
      <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>
      <div class="row">
        <div class="col-4 col-md-4 col-lg-4 mb-4 d-flex justify-content-center" v-for="cancion in canciones" :key="cancion.id">
          <Cancion :cancion="cancion" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carrusel from "../components/Carrusel.vue";
import SearchBar from "../components/SearchBar.vue";
import Cancion from "@/components/Cancion.vue";

const canciones = ref([]);
const backgroundStyle = ref("");

// Llamada a la API para obtener canciones
const searchDeezer = async () => {
  const llamada = await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart");
  const datos = await llamada.json();
  canciones.value = datos.tracks.data;
};
onMounted(searchDeezer);

// Cambiar el fondo con la imagen del carrusel
const updateBackground = (imageSrc) => {
  document.documentElement.style.setProperty("--home-bg", `url(${imageSrc})`);
};
</script>

<style scoped>
/* Contenedor principal */
.home-container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  color: white;
  background: 
    radial-gradient(circle at top, rgba(51, 51, 51, 0.8) 20%, rgba(0, 0, 0, 0.8) 100%), 
    var(--home-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>
