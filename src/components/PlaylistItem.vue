<template>
    <div class="list-group-item d-flex align-items-center bg-dark text-white shadow-sm rounded">
        <!-- Imagen del álbum -->
        <img :src="song.album.cover" alt="Portada del álbum" class="album-cover rounded shadow-sm me-3" />

        <!-- Información de la canción -->
        <div class="song-info flex-grow-1">
            <h5 class="mb-1 fw-bold text-light">{{ song.title }}</h5>
            <p class="mb-0 text-muted">{{ song.artist.name }}</p>
        </div>

        <!-- Botón de eliminación -->
        <button class="btn btn-outline-danger rounded-circle" @click="$emit('remove', song.id)">
            <i class="bi bi-trash3-fill"></i>
        </button>
    </div>
</template>

<script setup>
defineProps({
    song: Object
});
</script>

<style scoped>
.list-group-item {
    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
}

.list-group-item:hover {
    background-color: #222;
    transform: scale(1.02);
}

.album-cover {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
}

.btn-outline-danger {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
}
</style>