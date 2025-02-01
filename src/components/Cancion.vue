<template>
    <div class="card song-card">
      <!-- Imagen del álbum -->
      <img :src="cancion.album.cover_big" class="card-img-top" alt="Portada del álbum">
  
      <!-- Cuerpo de la card -->
      <div class="card-body text-center">
        <h5 class="card-title text-truncate" :title="cancion.title">{{ cancion.title }}</h5>
        
        <!-- Nombre del artista con enlace -->
        <p class="card-text">
          <a :href="cancion.artist.link" target="_blank" class="text-white text-decoration-none">
            🎤 {{ cancion.artist.name }}
          </a>
        </p>
  
        <!-- Reproductor de vista previa -->
        <audio v-if="cancion.preview" controls class="audio-player">
          <source :src="cancion.preview" type="audio/mpeg">
          Tu navegador no soporta audio.
        </audio>
  
        <!-- Botón para escuchar en Deezer -->
        <a :href="cancion.link" target="_blank" class="btn btn-outline-light btn-sm mt-2">
          <i class="fas fa-play"></i> Escuchar en Deezer
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    cancion: Object
  });
  </script>
  
  <style scoped>
  /* Estilo de la card */
  .song-card {
    background: transparent;
    border: none;
    color: white;
    transition: transform 0.2s ease-in-out;
  }
  
  .song-card:hover {
    transform: scale(1.05);
  }
  
  /* Imagen de la card */
  .card-img-top {
    border-radius: 10px;
  }
  
  /* Reproductor de audio */
  .audio-player {
    width: 100%;
    margin-top: 8px;
  }
  </style>
  