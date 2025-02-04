import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const searchQuery = ref("");  // Guarda la consulta de búsqueda
  const tracks = ref([]);
  const albums = ref([]);
  const artists = ref([]);

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setResults = (results) => {
    tracks.value = results.tracks;
    albums.value = results.albums;
    artists.value = results.artists;
  };

  // 📌 Nueva función para ejecutar la búsqueda directamente en el store
  const fetchResults = async () => {
    if (!searchQuery.value.trim()) return;

    try {
      const searchParam = encodeURIComponent(searchQuery.value);
      const baseURL = "http://localhost:8080/https://api.deezer.com/search?q=";

      const fetchWithDelay = (url, delay) =>
        new Promise(resolve => setTimeout(() => resolve(fetch(url)), delay));

      const [tracksRes, albumsRes, artistsRes] = await Promise.all([
        fetchWithDelay(`${baseURL}track:"${searchParam}"`, 0),
        fetchWithDelay(`${baseURL}album:"${searchParam}"`, 500),
        fetchWithDelay(`${baseURL}artist:"${searchParam}"`, 1000)
      ]);

      const [tracksData, albumsData, artistsData] = await Promise.all([
        tracksRes.json(),
        albumsRes.json(),
        artistsRes.json()
      ]);

      const searchText = searchQuery.value.toLowerCase();

      // 📌 Filtrar TRACKS
      const filteredTracks = (tracksData.data || []).filter(track =>
        track.title?.toLowerCase().includes(searchText)
      );

      // 📌 Extraer los ÁLBUMES
      const extractedAlbums = (albumsData.data || []).map(track => track.album);
      const uniqueAlbums = extractedAlbums
        .filter(album => album && album.title?.toLowerCase().includes(searchText))
        .filter((album, index, self) =>
          index === self.findIndex(a => a.id === album.id)
        );

      uniqueAlbums.forEach(album => {
        album.cover = album.cover_big || album.cover_medium || album.cover || "";
      });

      // 📌 Extraer los ARTISTAS
      const extractedArtists = (artistsData.data || []).map(track => track.artist);
      const uniqueArtists = extractedArtists
        .filter(artist => artist && artist.name?.toLowerCase().includes(searchText))
        .filter((artist, index, self) =>
          index === self.findIndex(a => a.id === artist.id)
        );

      uniqueArtists.forEach(artist => {
        artist.picture = artist.picture_big || artist.picture_medium || artist.picture || "";
      });

      setResults({
        tracks: filteredTracks,
        albums: uniqueAlbums,
        artists: uniqueArtists
      });

    } catch (error) {
      console.error("Error en la búsqueda:", error.message);
    }
  };

  const sortResults = (type) => {
    if (type === "alphabetical") {
      tracks.value.sort((a, b) => a.title.localeCompare(b.title));
      albums.value.sort((a, b) => a.title.localeCompare(b.title));
      artists.value.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "id") {
      tracks.value.sort((a, b) => a.id - b.id);
      albums.value.sort((a, b) => a.id - b.id);
      artists.value.sort((a, b) => a.id - b.id);
    }
  };

  return {
    searchQuery,
    tracks,
    albums,
    artists,
    setSearchQuery,
    setResults,
    fetchResults,
    sortResults, // 🔥 Ahora cualquier componente puede llamar a `fetchResults()`
  };
});
