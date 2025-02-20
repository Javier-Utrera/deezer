<template>
    <div v-if="mostrarModal" class="modal-backdrop">
        <div class="modal-container">
            <h2>¡Bienvenido!</h2>
            <p>Introduce tu nombre y elige un avatar para comenzar.</p>

            <input v-model="nombreUsuario" type="text" placeholder="Tu nombre" class="input" />

            <div class="avatar-selection">
                <h3>Elige un avatar:</h3>
                <div class="avatars">
                    <img v-for="(avatar, index) in avatares" :key="index" :src="avatar"
                        @click="seleccionarAvatar(avatar)" :class="{ selected: avatarSeleccionado === avatar }" />
                </div>
            </div>

            <button @click="guardarUsuario" class="btn btn-primary">Guardar</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const mostrarModal = ref(false);
const nombreUsuario = ref("");
const avatarSeleccionado = ref("");
const avatares = [
    "https://api.dicebear.com/6.x/pixel-art/svg?seed=User1",
    "https://api.dicebear.com/6.x/pixel-art/svg?seed=User2",
    "https://api.dicebear.com/6.x/pixel-art/svg?seed=User3"
];

onMounted(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
        mostrarModal.value = true;
    }
});

const emit = defineEmits(["usuarioRegistrado"]);

const seleccionarAvatar = (avatar) => {
    avatarSeleccionado.value = avatar;
};

const guardarUsuario = () => {
    if (!nombreUsuario.value || !avatarSeleccionado.value) return;

    const usuario = {
        nombre: nombreUsuario.value,
        avatar: avatarSeleccionado.value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    mostrarModal.value = false;

    emit("usuarioRegistrado", usuario); // 🔥 EMITE EL EVENTO CORRECTAMENTE
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
}

.input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
}

.avatars {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.avatars img {
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid transparent;
}

.avatars img.selected {
    border-color: blue;
}
</style>