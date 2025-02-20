<template>
    <div v-if="pistaActual" class="music-player">
        <!-- Controles de la izquierda -->
        <div class="player-controls">
            <button class="btn btn-dark" @click="reproducirAnterior">
                <i class="bi bi-skip-backward-fill"></i>
            </button>
            <button class="btn btn-dark play-btn" @click="alternarReproduccion">
                <i :class="estaReproduciendo ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>
            <button class="btn btn-dark" @click="reproducirSiguiente">
                <i class="bi bi-skip-forward-fill"></i>
            </button>
            <button class="btn btn-dark" @click="mostrarLista = !mostrarLista">
                <i class="bi bi-music-note-list"></i>
            </button>
        </div>

        <!-- Imagen de la canción en el centro -->
        <div class="track-info">
            <img v-if="pistaActual" :src="pistaActual.album.cover_small" alt="Cover" class="track-cover" />
            <div class="track-details">
                <h4>{{ pistaActual.title }}</h4>
                <p>{{ pistaActual.artist.name }}</p>
            </div>
        </div>

        <!-- Barra de progreso con tiempos -->
        <div class="progress-container">
            <span class="time">{{ formatearTiempo(progreso) }}</span>
            <input type="range" min="0" :max="audio?.duration || 1" step="0.1" v-model="progreso"
                @input="buscarTiempo" />
            <span class="time">{{ formatearTiempo(audio?.duration || 0) }}</span>
        </div>

        <!-- Lista de reproducción en el reproductor -->
        <div v-if="mostrarLista" class="playlist-container">
            <h5>Lista de Reproducción</h5>
            <ul>
                <li v-for="(song, index) in store.playlist" :key="song.id"
                    :class="{ 'playing': song.id === pistaActual.id }">
                    <span @click="store.setCurrentTrack(song)">
                        {{ index + 1 }}. {{ song.title }} - {{ song.artist.name }}
                    </span>
                    <button class="btn btn-sm btn-danger" @click="eliminarCancion(song.id)">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Audio (oculto) -->
        <audio ref="audio" :src="pistaActual.preview" @loadedmetadata="establecerDuracion"
            @timeupdate="actualizarProgreso"
            @ended="() => { reproducirSiguiente(); estaReproduciendo.value = true; }"></audio>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useFavoritesStore } from "@/stores/favorites.js";

const store = useFavoritesStore();

const eliminarCancion = (id) => {
    store.removeSong(id);
    if (pistaActual.value?.id === id) {
        reproducirSiguiente();
    }
};
const audio = ref(null);
const estaReproduciendo = ref(false);
const progreso = ref(0);
const duracion = ref(0);
const mostrarLista = ref(false);

const pistaActual = computed(() => store.currentTrack);

const alternarReproduccion = () => {
    if (!audio.value) return;
    if (estaReproduciendo.value) {
        audio.value.pause();
    } else {
        audio.value.play();
    }
    estaReproduciendo.value = !estaReproduciendo.value;
};

const reproducirSiguiente = () => {
    if (store.playlist.length > 0) {
        store.playNext();
        estaReproduciendo.value = true;
        setTimeout(() => audio.value?.play(), 100);
    } else {
        detenerReproduccion();
    }
};

const reproducirAnterior = () => {
    const indiceActual = store.playlist.findIndex((s) => s.id === pistaActual.value?.id);
    if (indiceActual > 0) {
        store.setCurrentTrack(store.playlist[indiceActual - 1]);
        estaReproduciendo.value = true;
        setTimeout(() => audio.value?.play(), 100);
    } else {
        detenerReproduccion();
    }
};

const establecerDuracion = () => {
    if (audio.value) {
        duracion.value = audio.value.duration || 0;
    }
};

const actualizarProgreso = () => {
    progreso.value = audio.value?.currentTime || 0;
};

const buscarTiempo = () => {
    if (audio.value) {
        audio.value.currentTime = progreso.value;
    }
};

const detenerReproduccion = () => {
    store.setCurrentTrack(null);
    estaReproduciendo.value = false;
    progreso.value = 0;
    if (audio.value) {
        audio.value.pause();
        audio.value.src = ""; // Limpiar la fuente de audio
    }
};

onMounted(() => {
    if (pistaActual.value && audio.value) {
        audio.value.play();
        estaReproduciendo.value = true;
    }
});

onUnmounted(() => {
    if (audio.value) {
        audio.value.pause();
        audio.value.src = "";
    }
});

watch(
    () => store.pistaActual,
    async (nuevaPista) => {
        if (!nuevaPista) {
            detenerReproduccion();
            return;
        }
        if (audio.value) {
            await nextTick();
            audio.value.src = nuevaPista.preview || "";
            if (nuevaPista.preview) {
                audio.value.load();
                audio.value.play();
                estaReproduciendo.value = true;
                progreso.value = 0;
            } else {
                detenerReproduccion();
            }
        }
    }
);
const formatearTiempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
};
</script>



<style scoped>
/* 🔹 Reproductor de Música */
.music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: #181818;
    color: white;
    display: flex;
    align-items: center;
    justify-content: stretch;
    padding: 10px 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

/* 🔹 Controles de reproducción */
.player-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* 🔹 Imagen de la canción en el centro */
.track-info {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
}

.track-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.track-details h4 {
    font-size: 14px;
    margin: 0;
}

.track-details p {
    font-size: 12px;
    margin: 0;
    color: #bbb;
}

/* 🔹 Barra de progreso */
.progress-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(0, 0, 0, 0.2);
}

.progress-container input {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: transparent;
    appearance: none;
}

.progress-container input::-webkit-slider-runnable-track {
    background: red;
    height: 5px;
}

.progress-container input::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    margin-top: -2px;
}

.time {
    font-size: 12px;
    color: white;
    min-width: 40px;
    text-align: center;
}

.playlist-container {
    position: fixed;
    bottom: 90px;
    left: 0;
    width: 20%;
    min-width: 250px;
    background: #22222293;
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
    border-top: 1px solid #444;
    transition: all 0.3s ease-in-out;
}

.playlist-container h5 {
    margin-bottom: 5px;
    color: white;
    text-align: center;
}

.playlist-container ul {
    list-style: none;
    padding: 0;
}

.playlist-container li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s;
    color: white;
}

.playlist-container li:hover {
    background: rgba(255, 255, 255, 0.1);
}

.playlist-container li.playing {
    font-weight: bold;
    color: #0d6efd;
}
</style>
