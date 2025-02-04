<template>
  <div class="search-container">
    <!-- 🔹 Fondo con imagen preprocesada -->
    <div class="background-overlay" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>

    <div class="content">

      <SearchBar class="p-5" />

      <!-- 📌 SearchResults emite la imagen de fondo -->
      <SearchResults @updateImage="updateBackground" :tracks="tracks" :albums="albums" :artists="artists" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";

const searchStore = useSearchStore();

// 📌 Obtener los resultados desde Pinia
const tracks = computed(() => searchStore.tracks);
const albums = computed(() => searchStore.albums);
const artists = computed(() => searchStore.artists);

// 📌 Imagen de fondo
const backgroundImage = ref("");

// 📌 Función para aplicar blur en el navegador
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

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Aplicar desenfoque
      ctx.globalAlpha = 0.2;
      for (let i = -10; i < 10; i += 5) {
        for (let j = -10; j < 10; j += 5) {
          ctx.drawImage(canvas, i, j);
        }
      }

      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};

// 📌 Función para actualizar la imagen de fondo con blur
const updateBackground = async (imageSrc) => {
  if (imageSrc) {
    const blurredImage = await blurImage(imageSrc);
    backgroundImage.value = blurredImage;
  }
};

// 📌 Ejecutar búsqueda automáticamente si ya había una consulta previa
onMounted(() => {
  if (searchStore.searchQuery) {
    console.log("Ejecutando búsqueda automática con:", searchStore.searchQuery);
    searchStore.fetchResults();
  }
});
</script>

<style scoped>
/* 🔹 Contenedor principal */
.search-container {
  width: 100%;
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
