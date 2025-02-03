<template>
  <nav :class="['sidebar', { 'collapsed': !isOpen }]">
    <ul>
      <li>
        <router-link to="/" class="nav-link">
          <i class="fas fa-home"></i> Inicio
        </router-link>
      </li>
      <li>
        <router-link to="/playlists" class="nav-link">
          <i class="fas fa-music"></i> Playlists
        </router-link>
      </li>
      <li>
        <router-link to="/search" class="nav-link">
          <i class="fas fa-search"></i> Buscador
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isOpen: Boolean
});
</script>

<style scoped>
/* Estilos del menú lateral */
.sidebar {
  width: 150px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

/* Cuando el menú está oculto */
.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 100px;
}

.sidebar li {
  width: 100%;
}

.nav-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  font-size: 16px;
  transition: background 0.3s ease-in-out;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}
.nav-link i{
  margin-right: 10px;  
}
</style>