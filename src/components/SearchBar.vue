<template>
  <div class="search-container">
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        placeholder="Buscar en Deezer..."
        aria-label="Buscar en Deezer"
      />
      <button @click="handleSearch" aria-label="Buscar">
        <i class="bi bi-search"></i> <!-- Ícono de Bootstrap -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";

const router = useRouter();
const route = useRoute();
const searchStore = useSearchStore();

const searchQuery = computed({
  get: () => searchStore.searchQuery,
  set: (value) => searchStore.setSearchQuery(value),
});

const handleSearch = () => {
  if (searchQuery.value.trim() === "") return;

  if (route.name !== "Buscador") {
    router.push({ name: "Buscador" });
  } else {
    searchStore.fetchResults(); // 🔥 Ahora busca directamente desde Pinia
  }
};
</script>


<style scoped>
/* Contenedor de la barra de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

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

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
}

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
