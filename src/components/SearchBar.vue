<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text" v-model="searchQuery" placeholder="Buscar en Deezer..."
        aria-label="Buscar en Deezer" />
      <div class="filter-buttons">
        <button class="btn btn-outline-light" @click="sortByAlphabetical">
          <i class="bi bi-sort-alpha-down"></i> A-Z
        </button>
        <button class="btn btn-outline-light" @click="sortById">
          <i class="bi bi-sort-numeric-down"></i> ID
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/stores/searchStore";

// Función de debounce sin lodash
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const router = useRouter();
const route = useRoute();
const searchStore = useSearchStore();

const searchQuery = computed({
  get: () => searchStore.searchQuery,
  set: (value) => searchStore.setSearchQuery(value),
});

// 📌 **Debounce para evitar múltiples llamadas a la API**
const debouncedSearch = debounce(async () => {
  if (searchQuery.value.trim() === "") return;
  await searchStore.fetchResults();
  if (route.name !== "Buscador") {
    router.push({ name: "Buscador" });
  }
}, 100);

// 📌 **Detectar cambios en la búsqueda y aplicar debounce**
watch(searchQuery, () => {
  debouncedSearch();
});

// 📌 **Ordenar por nombre alfabéticamente**
const sortByAlphabetical = () => {
  searchStore.sortResults("alphabetical");
};

// 📌 **Ordenar por ID numéricamente**
const sortById = () => {
  searchStore.sortResults("id");
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
