<template>
  <div class="card song-card">
    <!-- Imagen del álbum con icono de favorito -->
    <div class="image-container">
      <img :src="cancion.album.cover_big" class="card-img-top" alt="Portada del álbum">
      
      <!-- Botón de añadir a Playlist -->
      <button class="favorite-btn" @click="togglePlaylist">
        <i class="bi" :class="isInPlaylist ? 'bi-heart-fill' : 'bi-heart'"></i>
      </button>
    </div>

    <!-- Cuerpo de la card -->
    <div class="card-body text-center">
      <h5 class="card-title text-truncate" :title="cancion.title">{{ cancion.title }}</h5>

      <!-- Nombre del artista con enlace -->
      <p class="card-text">
        <a :href="cancion.artist.link" target="_blank" class="text-white text-decoration-none">
          {{ cancion.artist.name }}
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
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites";

const props = defineProps({
  cancion: Object
});

const favoritesStore = useFavoritesStore();

// Verifica si la canción ya está en la playlist
const isInPlaylist = computed(() => favoritesStore.isFavorite(props.cancion.id));

// Agregar o quitar de la playlist
const togglePlaylist = () => {
  if (isInPlaylist.value) {
    favoritesStore.removeSong(props.cancion.id);
  } else {
    favoritesStore.addSong(props.cancion);
  }
};
</script>

<style scoped>
/* 🔹 Estilo de la card */
.song-card {
  background: transparent;
  border: none;
  color: white;
  transition: transform 0.2s ease-in-out;
}

.song-card:hover {
  transform: scale(1.05);
}

/* 🔹 Contenedor de la imagen para posicionar el botón */
.image-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔹 Imagen del álbum */
.card-img-top {
  border-radius: 10px;
  width: 100%;
  height: auto;
}

/* 🔹 Botón de favorito (corazón) en la esquina superior derecha */
.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease-in-out;
  cursor: pointer;
}

/* 🔹 Color del ícono cuando la canción está en la playlist */
.favorite-btn .bi-heart-fill {
  color: red;
}

.favorite-btn:hover {
  color: red;
}

/* 🔹 Reproductor de audio */
.audio-player {
  width: 100%;
  margin-top: 8px;
}
</style>
