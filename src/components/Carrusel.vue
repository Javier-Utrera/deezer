<template>
  <div>
    <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>

    <!-- Carrusel -->
    <div id="carouselExampleIndicators" class="carousel slide custom-carousel mx-auto" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(album, index) in albunes" 
          :key="index" 
          :class="['carousel-item', { active: index === 0 }]">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ album.name }}</h5>
          </div>
          <img :src="album.picture_xl" class="d-block w-100 custom-img" alt="Imagen del álbum" />
        </div>
      </div>
     
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,defineEmits } from 'vue';

const albunes = ref([]);
const srcimagen = ref('');

const emit = defineEmits(["updateImage"]); 

const searchDeezer = async () => {
  const llamada = await fetch('http://localhost:8080/https://api.deezer.com/chart');
  const datos = await llamada.json();
  albunes.value = datos.artists.data;
  
  if (albunes.value.length > 0) {
    srcimagen.value = albunes.value[0].picture_xl;
    emit("updateImage", srcimagen.value);
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
  min-height: 400px; /* Mantiene altura fija */
  border-radius: 15px;
  overflow: hidden;
}

.custom-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 15px;
}

/* Imagen seleccionada debajo */
.selected-album {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  border: 3px solid white;
}
</style>
