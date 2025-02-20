<template>
  <nav :class="['sidebar', { 'collapsed': !isOpen }]">
    <!-- 🔥 Información del usuario -->
    <div class="user-info" v-if="usuario.nombre">
      <img :src="usuario.avatar" alt="Avatar" class="avatar" v-if="usuario.avatar" />
      <p class="username">{{ usuario.nombre }}</p>
    </div>

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

    <!-- 🔥 Botón de Logout -->
    <button class="logout-btn" @click="logout">Cerrar Sesión</button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  isOpen: Boolean // Controla si el menú está abierto
});

const usuario = ref({ nombre: "", avatar: "" });

onMounted(() => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    usuario.value = JSON.parse(usuarioGuardado);
  }
});

// 🔥 Función para cerrar sesión
const logout = () => {
  localStorage.removeItem("usuario");
  location.reload(); // 🔄 Recarga la app para volver a la pantalla de bienvenida
};
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

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 5px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
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

.nav-link i {
  margin-right: 10px;
}

/* 🔥 Botón de Logout */
.logout-btn {
  width: 100%;
  padding: 10px;
  background: red;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: darkred;
}
</style>
