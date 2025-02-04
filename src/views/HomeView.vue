<template>
  <div class="home-container">
    <!-- 🔹 Capa de fondo con la imagen ya preprocesada -->
    <div class="background-overlay" :style="{ backgroundImage }"></div>

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

// 📌 Estado para la imagen de fondo
const backgroundImage = ref("");

// 📌 Función para aplicar blur a la imagen en el navegador
const blurImage = async (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      // Dibujar la imagen original
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Aplicar desenfoque con opacidad reducida
      ctx.globalAlpha = 0.5;
      for (let i = -10; i < 10; i += 5) {
        for (let j = -10; j < 10; j += 5) {
          ctx.drawImage(canvas, i, j);
        }
      }

      // Convertir a base64 y devolver
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};

// 📌 Actualizar el fondo con la imagen borrosa
const updateBackground = async (imageSrc) => {
  if (imageSrc) {
    const blurredImage = await blurImage(imageSrc);
    backgroundImage.value = `url(${blurredImage})`;
  }
};

// 📌 Lista de canciones más populares
const canciones = ref([]);

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
</script>

<style scoped>
/* 🔹 Contenedor principal */
.home-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* 🔹 Capa de fondo con imagen preprocesada */
.background-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 0;
}


/* 🔹 Capa de contenido */
.content {
  position: relative;
  color: white;
  padding: 2rem;
  min-height: 100vh;
  padding-bottom: 60px;
  z-index: 1;
}
</style>
