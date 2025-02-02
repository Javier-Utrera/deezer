<template>
  <div class="card album-card">
    <!-- Imagen del álbum -->
    <img 
      :src="album.cover_big" 
      class="card-img-top" 
      alt="Portada del álbum"
    />

    <div class="card-body text-center">
      <h5 class="card-title text-truncate" :title="album.title">
        {{ album.title }}
      </h5>
    </div>
  </div>
</template>

<script setup>
defineProps({
  album: Object
});
</script>

<style scoped>
.album-card {
  background: transparent;
  border: none;
  color: white;
  transition: transform 0.2s ease-in-out;
}

.album-card:hover {
  transform: scale(1.05);
}

.card-img-top {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
