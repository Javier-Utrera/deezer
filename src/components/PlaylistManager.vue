<template>
  <div>
    <h3 class="text-white text-center">Lista de Reproducción</h3>

    <!-- Botón para borrar toda la playlist -->
    <div class="text-center mb-3">
      <button 
        class="btn btn-danger" 
        @click="clearPlaylist" 
        v-if="playlist.length > 0">
        Borrar toda la playlist
      </button>
    </div>

    <div v-if="playlist.length > 0" class="list-group">
      <!-- Lista arrastrable -->
      <div 
        class="draggable-list"
        @dragover.prevent
      >
        <div 
          v-for="(song, index) in playlist" 
          :key="song.id"
          class="draggable-item"
          draggable="true"
          @dragstart="startDrag(index)"
          @drop="dropItem(index)"
          @dragenter.prevent
        >
          <PlaylistItem 
            :song="song"
            @remove="removeFromFavorites"
          />
        </div>
      </div>
    </div>

    <p v-else class="text-center text-white">No hay canciones en tu playlist.</p>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';
import { ref, computed } from 'vue';
import PlaylistItem from '@/components/PlaylistItem.vue';

// Usar la store de favoritos
const favoritesStore = useFavoritesStore();
const playlist = computed(() => favoritesStore.playlist);

// Variables para drag & drop
const draggedIndex = ref(null);

// Función para iniciar el drag
const startDrag = (index) => {
  draggedIndex.value = index;
};

// Función para soltar el elemento en la nueva posición
const dropItem = (targetIndex) => {
  if (draggedIndex.value === null) return;
  
  const updatedPlaylist = playlist.value;
  const movedItem = updatedPlaylist.splice(draggedIndex.value, 1)[0];
  updatedPlaylist.splice(targetIndex, 0, movedItem);
  
  favoritesStore.setPlaylistOrder(updatedPlaylist);
  draggedIndex.value = null;
};

// Eliminar una canción
const removeFromFavorites = (songId) => {
  favoritesStore.removeSong(songId);
};

// Limpiar toda la playlist
const clearPlaylist = () => {
  favoritesStore.clearPlaylist();
};
</script>

<style scoped>
/* Contenedor de la lista arrastrable */
.draggable-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Estilo para los elementos arrastrables */
.draggable-item {
  cursor: grab;
  transition: background 0.2s;
}

.draggable-item:active {
  cursor: grabbing;
}

.draggable-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
