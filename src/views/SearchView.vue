<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Resultados de búsqueda</h2>
    <SearchBar @updateResults="actualizarResultados" />
    <SearchResults :tracks="tracks" :albums="albums" :artists="artists" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";

const tracks = ref([]);
const albums = ref([]);
const artists = ref([]);

const actualizarResultados = (resultados) => {
  tracks.value = resultados.tracks;
  albums.value = resultados.albums;
  artists.value = resultados.artists;
};
// Verificar que se reciben los datos correctamente
watchEffect(() => {
  console.log("Tracks:", tracks.value);
  console.log("Albums:", albums.value);
  console.log("Artists:", artists.value);
});
</script>
