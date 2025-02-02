<template>
  <div v-if="artist" class="card artist-card">
    <!-- Verificar si `picture_big` existe antes de usarlo -->
    <img 
      :src="artist.picture_big || 'https://via.placeholder.com/250'" 
      class="card-img-top" 
      alt="Imagen del artista"
    />

    <div class="card-body text-center">
      <h5 class="card-title text-truncate" :title="artist.name">
        {{ artist.name || "Artista Desconocido" }}
      </h5>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artist: Object
});
</script>

<style scoped>
.artist-card {
  background: transparent;
  border: none;
  color: white;
  transition: transform 0.2s ease-in-out;
}

.artist-card:hover {
  transform: scale(1.05);
}

.card-img-top {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
