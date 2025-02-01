<template>
    <div class="card artist-card">
      <!-- Imagen del artista -->
      <img :src="artista.picture_big" class="card-img-top" alt="Imagen del artista">
  
      <!-- Cuerpo de la card -->
      <div class="card-body text-center">
        <h5 class="card-title text-truncate" :title="artista.name">{{ artista.name }}</h5>
  
        <!-- Botón para ver el artista en Deezer -->
        <a :href="artista.link" target="_blank" class="btn btn-outline-light btn-sm mt-2">
          <i class="fas fa-user"></i> Ver en Deezer
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    artista: Object
  });
  </script>
  
  <style scoped>
  /* Estilo de la card */
  .artist-card {
    background: transparent;
    border: none;
    color: white;
    transition: transform 0.2s ease-in-out;
  }
  
  .artist-card:hover {
    transform: scale(1.05);
  }
  
  /* Imagen de la card */
  .card-img-top {
    border-radius: 50%; /* Imagen redonda */
    width: 100%;
    max-width: 150px;
    height: auto;
    margin: auto;
  }
  </style>
  