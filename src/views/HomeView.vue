<template>
  <div class="home-container" >
    <!-- 🔹 Capa de oscurecimiento con opacidad -->
    <div class="background-overlay" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>

    <!-- 🔹 Contenido principal -->
    <div class="content">
      <SearchBar class="p-5" />
      <Carrusel class="pb-5" @updateImage="updateBackground" />

      <div class="container mt-4">
        <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>
        <div class="row">
          <div class="col-4 col-md-4 col-lg-4 mb-4 d-flex justify-content-center" v-for="cancion in canciones"
            :key="cancion.id">
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

// Imagen de fondo predeterminada
const backgroundImage = ref();

const canciones = ref([]);

// 📌 Obtener canciones populares
const searchDeezer = async () => {
  try {
    const response = await fetch("http://localhost:8080/https://api.deezer.com/chart");
    const data = await response.json();
    canciones.value = data.tracks.data;
  } catch (error) {
    console.error("Error al obtener canciones:", error);
  }
};

onMounted(searchDeezer);

// 📌 Actualizar la imagen de fondo
const updateBackground = (imageSrc) => {
  if (imageSrc) {
    backgroundImage.value = imageSrc;
  }
};
</script>



<style scoped>
/* 🔹 Contenedor principal con imagen de fondo */
.home-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 3;
}

/* 🔹 Capa de oscurecimiento */
.background-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: blur(2px);
  z-index: 4;
}

/* 🔹 Capa de contenido */
.content {
  position: relative;
  color: white;
  padding: 2rem;
  min-height: 100vh;
  z-index: 5;
}

</style>
