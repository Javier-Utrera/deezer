import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './assets/transicion.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);  // ✅ Usar la instancia correcta
app.use(router);

// 🔥 Exponer el store en `window`
app.mount('#app');


