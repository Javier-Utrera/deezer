<template>
    <div v-if="artista" class="container mt-4 text-white">
      <!-- Información del Artista -->
      <div class="info-card">
        <img :src="artista.picture_big" alt="Foto del artista" class="artist-photo">
        <div class="details">
          <h2>{{ artista.name }}</h2>
          <p><strong>Seguidores:</strong> {{ artista.nb_fan.toLocaleString() }}</p>
        </div>
      </div>
  
      <!-- Sección de Resultados -->
      <h3 class="mt-4">Música de {{ artista.name }}</h3>
      <SearchResults 
        :albums="albums" 
        :tracks="tracks"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useSearchStore } from "@/stores/searchStore.js";
  import SearchResults from "@/components/SearchResults.vue";
  
  const route = useRoute();
  const searchStore = useSearchStore();
  const artista = ref(null);
  const albums = ref([]);
  const tracks = ref([]);
  
  onMounted(async () => {
  artista.value = await searchStore.fetchArtistById(route.params.id);
  console.log("🎤 Artista obtenido:", artista.value);

  albums.value = await searchStore.fetchAlbumsByArtist(route.params.id);
  tracks.value = await searchStore.fetchTracksByArtist(route.params.id);
});

  </script>
  
  <style scoped>
  .info-card {
    display: flex;
    align-items: center;
    background: #222;
    padding: 20px;
    border-radius: 10px;
  }
  
  .artist-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .details {
    flex: 1;
  }
  </style>