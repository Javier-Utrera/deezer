<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Resultados de búsqueda</h2>
    <SearchBar />
    <SearchResults :tracks="tracks" :albums="albums" :artists="artists" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";

const searchStore = useSearchStore();

const tracks = computed(() => searchStore.tracks);
const albums = computed(() => searchStore.albums);
const artists = computed(() => searchStore.artists);

onMounted(() => {
  if (searchStore.searchQuery) {
    console.log("Ejecutando búsqueda automática con:", searchStore.searchQuery);
    searchStore.fetchResults(); // 🔥 Ejecutar la búsqueda desde Pinia
  }
});
</script>