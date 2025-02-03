<template>
  <div>
    <h2 class="text-center mb-4">Top Artistas Más Populares</h2>

    <!-- Carrusel -->
    <div id="carouselExampleIndicators" class="carousel slide custom-carousel mx-auto" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(artist, index) in artistas" :key="artist.id" :class="['carousel-item', { active: index === 0 }]">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ artist.name }}</h5> <!-- ✅ Muestra correctamente el nombre del artista -->
          </div>
          <img :src="artist.picture_xl" class="d-block w-100 custom-img" alt="Imagen del artista" />
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const artistas = ref([]);
const srcimagen = ref("");
const emit = defineEmits(["updateImage"]);

const searchDeezer = async () => {
  try {
    const llamada = await fetch("http://localhost:8080/https://api.deezer.com/chart");
    const datos = await llamada.json();

    // 📌 Asegurar que obtenemos los artistas
    if (datos.artists && datos.artists.data.length) {
      artistas.value = datos.artists.data; // ✅ Ahora obtenemos correctamente los artistas
    } else {
      console.error("No se encontraron artistas en la API de Deezer.");
    }

    // Si hay artistas, establecer la imagen de fondo inicial
    if (artistas.value.length > 0) {
      srcimagen.value = artistas.value[0].picture_xl; // ✅ Usamos `picture_xl` en lugar de `cover_xl`
      emit("updateImage", srcimagen.value);
    }
  } catch (error) {
    console.error("Error al obtener los artistas:", error);
  }
};

onMounted(() => {
  searchDeezer();
  const carousel = document.getElementById("carouselExampleIndicators");
  if (carousel) {
    carousel.addEventListener("slid.bs.carousel", () => {
      const activeItem = carousel.querySelector(".carousel-item.active img");
      if (activeItem) {
        srcimagen.value = activeItem.getAttribute("src");
        emit("updateImage", srcimagen.value);
      }
    });
  }
});
</script>

<style scoped>
.custom-carousel {
  width: 50%;
  max-width: 600px;
  min-height: 400px;
  border-radius: 15px;
  overflow: hidden;
}

.custom-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
