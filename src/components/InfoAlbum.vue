<template>
    <div v-if="album" class="container mt-4 text-white">
        <!-- Cabecera del Álbum -->
        <div class="album-header">
            <img :src="album.cover_big || ''" :alt="album.title" class="album-cover">
            <div class="album-details">
                <h2>{{ album.title }}</h2>
                <p><strong>Artista:</strong> {{ album.artist?.name }}</p>
                <p><strong>Fecha de lanzamiento:</strong> {{ album.release_date }}</p>
                <p><strong>Género:</strong> {{ album.genres?.data?.[0]?.name || "Desconocido" }}</p>
                <p><strong>Duración:</strong> {{ formatearDuracion(album.duration) }}</p>
                <p><strong>Popularidad:</strong> ⭐ {{ album.fans }} seguidores</p>
                <button class="btn btn-primary mt-2" @click="reproducirAlbum">Reproducir Álbum</button>
            </div>
        </div>

        <!-- 🔥 Usar el mismo formato que InfoCancion.vue para cargar `SearchResults` -->
        <SearchResults :tracks="tracks" :artists="[artista]" />
    </div>

    <div v-else class="text-center text-white">
        <p>Cargando información del álbum...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites.js";
import { useSearchStore } from "@/stores/searchStore.js";
import SearchResults from "@/components/SearchResults.vue";

const route = useRoute();
const store = useFavoritesStore();
const searchStore = useSearchStore();
const album = ref({});
const artista = ref({});
const tracks = ref([]);

onMounted(async () => {
    album.value = await searchStore.fetchAlbumById(route.params.id);
    
    if (album.value?.artist?.id) {
        artista.value = await searchStore.fetchArtistById(album.value.artist.id);
    }

    if (album.value?.tracks?.data?.length) {
        tracks.value = album.value.tracks.data;
    }
});

const reproducirAlbum = () => {
    store.clearPlaylist();
    tracks.value.forEach(track => store.addSong(track));
};

const formatearDuracion = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
};
</script>

<style scoped>
.album-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.album-cover {
    width: 200px;
    border-radius: 10px;
}

.album-details {
    max-width: 500px;
}
</style>
