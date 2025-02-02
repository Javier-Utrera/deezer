<template>
  <div class="container mt-4">
    <!-- Sección de Canciones -->
    <div v-show="tracks.length">
      <h3 class="section-title">Canciones</h3>
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <button class="btn btn-dark scroll-btn left" @click="scrollLeft('tracks')">
            <i class="bi bi-arrow-left"></i>
          </button>
          <div class="card-deck">
            <div class="card-wrapper" v-for="cancion in paginatedTracks" :key="cancion.id">
              <Cancion :cancion="cancion" />
            </div>
          </div>
          <button class="btn btn-dark scroll-btn right" @click="scrollRight('tracks')">
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Álbumes -->
    <div v-show="albums.length">
      <h3 class="section-title">Álbumes</h3>
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <button class="btn btn-dark scroll-btn left" @click="scrollLeft('albums')">
            <i class="bi bi-arrow-left"></i>
          </button>
          <div class="card-deck">
            <div class="card-wrapper" v-for="album in paginatedAlbums" :key="album.id">
              <Album :album="album" />
            </div>
          </div>
          <button class="btn btn-dark scroll-btn right" @click="scrollRight('albums')">
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Artistas -->
    <div v-show="artists.length">
      <h3 class="section-title">Artistas</h3>
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <button class="btn btn-dark scroll-btn left" @click="scrollLeft('artists')">
            <i class="bi bi-arrow-left"></i>
          </button>
          <div class="card-deck">
            <div class="card-wrapper" v-for="artist in paginatedArtists" :key="artist.id">
              <Artista :artist="artist" />
            </div>
          </div>
          <button class="btn btn-dark scroll-btn right" @click="scrollRight('artists')">
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import Cancion from "@/components/Cancion.vue";
import Album from "@/components/Album.vue";
import Artista from "@/components/Artista.vue";

const props = defineProps({
  tracks: Array,
  albums: Array,
  artists: Array
});

// Número de `cards` visibles en 2 filas
const cardsPerPage = 8;

// Índices de paginación
const trackIndex = ref(0);
const albumIndex = ref(0);
const artistIndex = ref(0);

// Obtener las páginas actuales de `cards`
const paginatedTracks = computed(() => props.tracks.slice(trackIndex.value, trackIndex.value + cardsPerPage));
const paginatedAlbums = computed(() => props.albums.slice(albumIndex.value, albumIndex.value + cardsPerPage));
const paginatedArtists = computed(() => props.artists.slice(artistIndex.value, artistIndex.value + cardsPerPage));

// Función para desplazar izquierda
const scrollLeft = (type) => {
  if (type === "tracks" && trackIndex.value > 0) {
    trackIndex.value -= cardsPerPage;
  }
  if (type === "albums" && albumIndex.value > 0) {
    albumIndex.value -= cardsPerPage;
  }
  if (type === "artists" && artistIndex.value > 0) {
    artistIndex.value -= cardsPerPage;
  }
};

// Función para desplazar derecha
const scrollRight = (type) => {
  if (type === "tracks" && trackIndex.value + cardsPerPage < props.tracks.length) {
    trackIndex.value += cardsPerPage;
  }
  if (type === "albums" && albumIndex.value + cardsPerPage < props.albums.length) {
    albumIndex.value += cardsPerPage;
  }
  if (type === "artists" && artistIndex.value + cardsPerPage < props.artists.length) {
    artistIndex.value += cardsPerPage;
  }
};
</script>

<style scoped>
.card-deck-wrapper {
  padding: 25px;
  border-radius: 10px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

/* Card deck */
.card-deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  transition: transform 0.3s ease-in-out
}

.card-deck-container {
  position: relative;
}

/* Card wrapper */
.card-wrapper {
  flex: 0 0 calc(25% - 10px);
  max-width: 18rem;
}

/* Botones de desplazamiento */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.scroll-btn.left {
  left: -100px;
}

.scroll-btn.right {
  right: -100px;
}
</style>
