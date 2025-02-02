<template>
  <div id="carouselExampleIndicators" class="carousel slide custom-carousel mx-auto" data-bs-ride="carousel">
    <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>
    <div class="carousel-inner">
      <div v-for="(album, index) in albunes" :key="index" :class="['carousel-item', { active: index === 0 }]">
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ album.name }}</h5>
        </div>
        <img :src="album.picture_xl" class="d-block w-100 custom-img" alt="Imagen del álbum" />
      </div>
    </div>

    <!-- Controles del carrusel -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const albunes = ref([]);

const searchDeezer = async () => {
  const llamada = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
  const datos = await llamada.json();
  albunes.value = datos.artists.data;
};
onMounted(searchDeezer);
</script>

<style scoped>
.custom-carousel {
  width: 50%;
  max-width: 600px;
  min-height: 400px; /* Mantiene altura fija */
  border-radius: 15px;
  overflow: hidden;
}

/* Imágenes dentro del carrusel */
.custom-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Hace que las imágenes encajen sin deformarse */
  border-radius: 15px;
}
/* Estilos para la caja de texto del carrusel */
.carousel-caption {
  background: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
  padding: 15px;
  border-radius: 12px; /* Bordes redondeados */
  display: inline-block; /* Ajusta el tamaño al contenido */
  max-width: 80%; /* Evita que ocupe todo el ancho */
  text-align: center;
}

/* Estilos para los textos */
.carousel-caption h5 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
}

.carousel-caption p {
  font-size: 1rem;
  color: #ddd;
}

</style>