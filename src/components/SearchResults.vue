<template>
  <div class="container mt-4">
    <!-- Filtros -->
    <div class="filter-buttons text-center mb-3">
      <button v-if="tracks?.length > 0 && albums?.length > 0 && artists?.length > 0" class="btn btn-outline-light" @click="filtroActivo = 'todos'">Todos</button>
      <button v-if="tracks?.length > 0" class="btn btn-outline-light" @click="filtroActivo = 'canciones'">Canciones</button>
      <button v-if="albums?.length > 0"class="btn btn-outline-light" @click="filtroActivo = 'albumes'">Álbumes</button>
      <button v-if="artists?.length > 0"class="btn btn-outline-light" @click="filtroActivo = 'artistas'">Artistas</button>
    </div>

    <!-- Sección de Canciones -->
    <div v-show="(filtroActivo === 'todos' || filtroActivo === 'canciones') && tracks?.length > 0">
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <h3 class="section-title">Canciones</h3>
          <div class="card-deck">
            <div class="card-wrapper" v-for="cancion in tracks" :key="cancion.id">
              <Cancion :cancion="cancion" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de Álbumes -->
    <div v-show="(filtroActivo === 'todos' || filtroActivo === 'albumes') && albums?.length > 0">
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <h3 class="section-title">Álbumes</h3>
          <div class="card-deck">
            <div class="card-wrapper" v-for="album in albums" :key="album.id">
              <Album :album="album" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de Artistas -->
    <div v-show="(filtroActivo === 'todos' || filtroActivo === 'artistas') && artists?.length > 0">
      <div class="card-deck-wrapper bg-dark">
        <div class="card-deck-container">
          <h3 class="section-title">Artistas</h3>
          <div class="card-deck">
            <div class="card-wrapper" v-for="artist in artists" :key="artist.id">
              <Artista :artist="artist" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import Cancion from "@/components/Cancion.vue";
import Album from "@/components/Album.vue";
import Artista from "@/components/Artista.vue";

const props = defineProps({
  tracks: Array,
  albums: Array,
  artists: Array
});

const emit = defineEmits(["updateImage"]);
const filtroActivo = ref("todos");

const getBackgroundImage = () => {
  if (props.tracks?.length > 0) return props.tracks[0].album.cover_big;
  if (props.albums?.length > 0) return props.albums[0].cover_big;
  if (props.artists?.length > 0) return props.artists[0].picture_big;
  return null;
};

watch(() => [props.tracks, props.albums, props.artists], () => {
  const imageSrc = getBackgroundImage();
  if (imageSrc) {
    emit("updateImage", imageSrc);
  }
}, { deep: true });
</script>

<style scoped>
.card-deck {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-x: auto;
  max-height: 500px;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
  justify-content: center;
}

.card-wrapper {
  max-width: 200px;
}

.card-deck::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.card-deck-wrapper {
  padding: 25px;
  border-radius: 10px;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

.card-deck-container {
  position: relative;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
