import { ref } from 'vue';

export const isPlaying = ref(false);
export const currentSong = ref({
  title: 'Nombre de la canción',
  artist: 'Artista',
  image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop'
});

export function playSong(song) {
  currentSong.value = song;
  isPlaying.value = true;
}
