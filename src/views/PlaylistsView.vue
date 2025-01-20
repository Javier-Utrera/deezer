<template>
    <div>
      <h1>Playlists</h1>
      <p>Gestiona tus playlists aquí.</p>
    </div>
  <!-- Integrar el componente Pinia -->
  <PiniaComponent />
    <!-- Mostrar datos de la store directamente -->
    <div class="store-data">
      <h3>Datos desde la Store:</h3>
      <p>Email actual: {{ userEmail }}</p>
      <p>Dominio del email: {{ emailDomain }}</p>
    </div>
      
  </template>
  
  <script setup>
  // Accede a la store
import { computed } from 'vue';

import PiniaComponent from '../components/pinia.vue';


  </script>
  
  <style scoped>
  h1 {
    color: #28a745;
  }
  </style>