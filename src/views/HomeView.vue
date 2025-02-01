<template>
  <!-- Barra de busqueda -->
  <SearchBar class="p-5"/>
  <!-- CARRUSEL -->
  <Carrusel class="pb-5"/>

  <div class="container mt-4">
    <h2 class="text-center mb-4">Top 10 Canciones Más Escuchadas</h2>
    <div class="row">
      <div class="col-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center" v-for="cancion in canciones" :key="cancion.id">
        <Cancion :cancion="cancion" />
      </div>
    </div>
  </div>

</template>

<script setup>
import Carrusel from "../components/Carrusel.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, onMounted } from 'vue';
import Cancion from '@/components/Cancion.vue';

const canciones = ref([]);

const searchDeezer = async () => {
  const llamada = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
  const datos = await llamada.json();
  canciones.value = datos.tracks.data;
};
onMounted(searchDeezer);
</script>

<style scoped>
.container {
  padding-bottom: 40px;
}
</style>
