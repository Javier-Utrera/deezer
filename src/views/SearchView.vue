<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <label for="explicitas">Ocultar letras explicitas:</label>
    <input type="checkbox" v-model="explicito" id="explicitas" name="explicitas" ><br><br>
    <label for="duracion">Duracion minima</label>
    <input type="number" v-model="duracion" id="duracion" name="duracion" ><br><br>
    <!-- Componente hijo -->
    <SearchBar @results="handleResults" />
    <!-- Lista de canciones -->
    <ul v-if="songs.length > 0">
      <li v-for="song in filtrocomputado" :key="song.id">
        <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }} - {{ song.duration }}
      </li>
    </ul>
    <p v-else>No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
const songs = ref([]);
// Maneja los resultados emitidos por el componente hijo
const handleResults = (data) => {
  songs.value = data;  
};

var explicito = ref(false);
var duracion = ref(0);

var filtrocomputado = computed(()=>{

  var canciones = [...songs.value]

  if(explicito.value)
    canciones = canciones.filter((cancion)=>cancion.explicit_lyrics === false)

  if(duracion.value){
    canciones = canciones.filter((cancion)=>cancion.duration>=duracion.value)
  }
  
  return canciones;

})
</script>



<style scoped>
h1 {
  color: #dc3545;
}

.search-page {
  padding: 20px;
}

.album-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
}

.album-info img {
  margin-top: 10px;
  width: 200px;
  border-radius: 10px;
}

.songs {
  margin-top: 20px;
}

.song-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.song-card {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #e9ecef;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.song-card audio {
  margin-top: 10px;
  width: 100%;
}
</style>