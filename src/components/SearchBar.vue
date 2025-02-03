<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Buscar en Deezer..."
        aria-label="Buscar en Deezer" />
      <button @click="handleSearch" aria-label="Buscar">
        <i class="bi bi-search"></i> <!-- Ícono de Bootstrap -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted  } from "vue";
import { useRoute, useRouter } from "vue-router";

var searchQuery = ref("");
const emit = defineEmits(["updateResults"]);
const router = useRouter();
const route = useRoute();

const handleSearch = async () => {
  if (searchQuery.value.trim() === "") return;
  try {
    const searchParam = encodeURIComponent(searchQuery.value);
    const baseURL = "http://localhost:8080/https://api.deezer.com/search?q=";

    // Hacer las peticiones con retraso para evitar bloqueos
    const fetchWithDelay = (url, delay) =>
      new Promise(resolve => setTimeout(() => resolve(fetch(url)), delay));

    const [tracksRes, albumsRes, artistsRes] = await Promise.all([
      fetchWithDelay(`${baseURL}track:"${searchParam}"`, 0),
      fetchWithDelay(`${baseURL}album:"${searchParam}"`, 500), // 500ms de diferencia
      fetchWithDelay(`${baseURL}artist:"${searchParam}"`, 1000) // 1s de diferencia
    ]);

    const [tracksData, albumsData, artistsData] = await Promise.all([
      tracksRes.json(),
      albumsRes.json(),
      artistsRes.json()
    ]);

    const searchText = searchQuery.value.toLowerCase();

    // 📌 Filtrar TRACKS cuyo título contiene el término de búsqueda
    const filteredTracks = (tracksData.data || []).filter(track =>
      track.title?.toLowerCase().includes(searchText)
    );

    // 📌 Extraer los ALBUMES desde los tracks y eliminar duplicados
    const extractedAlbums = (albumsData.data || []).map(track => track.album);
    const uniqueAlbums = extractedAlbums
      .filter(album => album && album.title?.toLowerCase().includes(searchText)) // Filtra por el título del álbum
      .filter((album, index, self) =>
        index === self.findIndex(a => a.id === album.id) // Elimina duplicados
      );

    // 📌 Extraer los ARTISTAS desde los tracks y eliminar duplicados
    const extractedArtists = (artistsData.data || []).map(track => track.artist);
    const uniqueArtists = extractedArtists
      .filter(artist => artist && artist.name?.toLowerCase().includes(searchText)) // Filtra por nombre del artista
      .filter((artist, index, self) =>
        index === self.findIndex(a => a.id === artist.id) // Elimina duplicados
      );

    // Emitir los resultados filtrados al componente padre
    emit("updateResults", {
      tracks: filteredTracks,
      albums: uniqueAlbums,
      artists: uniqueArtists
    });

    // Redirigir a SearchView si no estamos en ella
    if (route.name !== "Buscador") {
      router.push({ name: "Buscador", query: { q: searchQuery.value } });
    }
  } catch (error) {
    console.error("Error en la búsqueda:", error.message);
  }
};

onMounted(()=>{
  if(!searchQuery.value){
    searchQuery.value = route.fullPath.split('=')[1];
    if(searchQuery.value){
      handleSearch();
    }
  }
});



</script>

<style scoped>
/* Contenedor de la barra de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* Estilos del input y botón */
.search-input {
  width: 90%;
  max-width: 600px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  padding: 0;
}

/* Estilos del campo de búsqueda */
.search-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
}

/* Estilos del botón de búsqueda */
.search-input button {
  border: none;
  background-color: transparent;
  padding: 0 10px;
  cursor: pointer;
  color: #777;
  font-size: 20px;
  transition: color 0.3s;
}

.search-input button:hover {
  color: #000;
}
</style>