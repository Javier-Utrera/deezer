<template>
    <div>
      <h3 class="text-white text-center">Lista de Reproducción</h3>
  
      <div v-if="playlist.length > 0" class="list-group">
        <transition-group name="fade" tag="div">
          <PlaylistItem 
            v-for="song in playlist" 
            :key="song.id" 
            :song="song"
            @remove="removeFromFavorites"
          />
        </transition-group>
      </div>
  
      <p v-else class="text-center text-white">No hay canciones en tu playlist.</p>
    </div>
  </template>
  
  <script setup>
  import { useFavoritesStore } from '@/stores/favorites';
  import { computed } from 'vue';
  import PlaylistItem from '@/components/PlaylistItem.vue';
  
  // Usar la store de favoritos
  const favoritesStore = useFavoritesStore();
  const playlist = computed(() => favoritesStore.playlist);
  
  // Función para eliminar una canción
  const removeFromFavorites = (songId) => {
    favoritesStore.removeSong(songId);
  };
  </script>
  