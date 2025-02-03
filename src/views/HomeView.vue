<template>
  <div class="home-container" :style="{ backgroundImage: backgroundStyle }">
    <!-- Capa de fondo desenfocada -->
    <div class="background-blur"></div>

    <!-- Contenido principal -->
    <div class="content">
      <SearchBar class="p-5" />
      <Carrusel class="pb-5" @updateImage="updateBackground" />

      <div class="container mt-4">
        <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>
        <div class="row">
          <div 
            class="col-4 col-md-4 col-lg-4 mb-4 d-flex justify-content-center" 
            v-for="cancion in canciones" 
            :key="cancion.id"
          >
            <Cancion :cancion="cancion" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Carrusel from "@/components/Carrusel.vue";
import SearchBar from "@/components/SearchBar.vue";
import Cancion from "@/components/Cancion.vue";

const canciones = ref([]);
const backgroundStyle = ref("");

// Llamada a la API para obtener canciones
const searchDeezer = async () => {
  const response = await fetch("http://localhost:8080/https://api.deezer.com/chart");
  const data = await response.json();
  canciones.value = data.tracks.data;
};

onMounted(searchDeezer);

// Cambiar el fondo con la imagen del carrusel
const updateBackground = (imageSrc) => {
  backgroundStyle.value = `url(${imageSrc})`;
};
</script>

<style scoped>
.home-container {

  width: 100vw;
  min-height: 100vh;
  color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Capa para desenfocar solo la imagen de fondo */
.background-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(40px);
  z-index: 0;
}

/* Asegura que el contenido esté encima del fondo */
.content {
  position: relative;
  z-index: 1;
}
</style>
