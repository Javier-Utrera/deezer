<template>
    <div v-if="cancion" class="container mt-4 text-white">
        <!-- Información de la Canción -->
        <div class="info-card">
            <img :src="cancion?.album?.cover_big || ''" alt="Portada del álbum" class="album-cover">
            <div class="details">
                <h2>{{ cancion.title }}</h2>
                <p><strong>Duración:</strong> {{ formatearTiempo(cancion.duration) }}</p>
                <p><strong>Popularidad:</strong> {{ cancion.rank }}</p>
                <p><strong>Tiene Letra Explícita:</strong> {{ cancion.explicit_lyrics ? "Sí" : "No" }}</p>
                <p><strong>Año de lanzamiento:</strong> {{ cancion?.release_date || "Desconocido" }}</p>
                <p><strong>BPM:</strong> {{ cancion?.bpm || "No disponible" }}</p>
                <p><strong>Tipo:</strong> {{ cancion?.type || "Desconocido" }}</p>
                <!-- Sección de Reproductor -->
                <div class="player">
                    <audio controls :src="cancion?.preview"></audio>
                </div>
            </div>
        </div>

        <!-- Resultados relacionados -->
        <SearchResults 
            v-if="albums.length > 0 || artista?.id"
            :albums="albums"
            :artists="artista ? [artista] : []"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSearchStore } from "@/stores/searchStore.js";
import SearchResults from "@/components/SearchResults.vue";

const route = useRoute();
const searchStore = useSearchStore();
const cancion = ref(null);
const artista = ref(null);
const albums = ref([]); // ✅ Inicializar como array vacío

onMounted(async () => {
    cancion.value = await searchStore.fetchTrackById(route.params.id);
    console.log("🎵 Canción obtenida:", cancion.value);

    if (cancion.value?.artist?.id) {
        artista.value = await searchStore.fetchArtistById(cancion.value.artist.id);
        console.log("🎤 Artista obtenido:", artista.value);

        albums.value = await searchStore.fetchAlbumsByArtist(cancion.value.artist.id);
        console.log("💿 Álbumes obtenidos:", albums.value); // ✅ Ahora sí mostrará los álbumes en consola
    }
});

const formatearTiempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
};
</script>

<style scoped>
.info-card {
    display: flex;
    align-items: center;
    background: #222;
    padding: 20px;
    border-radius: 10px;
}

.album-cover {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-right: 20px;
}

.details {
    flex: 1;
}

.player {
    margin-top: 20px;
}
</style>
