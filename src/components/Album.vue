<template>
    <div class="card album-card">
      <!-- Imagen del álbum -->
      <img :src="album.cover_big" class="card-img-top" alt="Portada del álbum">
  
      <!-- Cuerpo de la card -->
      <div class="card-body text-center">
        <h5 class="card-title text-truncate" :title="album.title">{{ album.title }}</h5>
        
        <!-- Nombre del artista con enlace -->
        <p class="card-text">
          <a :href="album.artist.link" target="_blank" class="text-white text-decoration-none">
            🎤 {{ album.artist.name }}
          </a>
        </p>
  
        <!-- Botón para ver el álbum en Deezer -->
        <a :href="album.link" target="_blank" class="btn btn-outline-light btn-sm mt-2">
          <i class="fas fa-music"></i> Ver en Deezer
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    album: Object
  });
  </script>
  
  <style scoped>
  /* Estilo de la card */
  .album-card {
    background: transparent;
    border: none;
    color: white;
    transition: transform 0.2s ease-in-out;
  }
  
  .album-card:hover {
    transform: scale(1.05);
  }
  
  /* Imagen de la card */
  .card-img-top {
    border-radius: 10px;
  }
  </style>
  