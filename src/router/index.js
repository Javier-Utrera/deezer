import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import PlaylistsView from '../views/PlaylistsView.vue';
import SearchView from '../views/SearchView.vue';
import InfoAlbum from '../components/InfoAlbum.vue';
import InfoCancion from '../components/InfoCancion.vue';
import InfoArtista from '../components/InfoArtista.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: PlaylistsView,
  },
  {
    path: '/search/',
    name: 'Buscador',
    component: SearchView,
  },
  { path: '/album/:id', component: InfoAlbum },
  { path: '/cancion/:id', component: InfoCancion },
  { path: '/artista/:id', component: InfoArtista },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
