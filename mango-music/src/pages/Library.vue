<template>
  <div :style="{ display: 'flex', backgroundColor: '#F8F5F2', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px', paddingBottom: '120px' }">
      <div :style="libraryContainerStyle">
        
        <!-- Header (Hide when a playlist is selected) -->
        <div v-if="!selectedPlaylist" :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '45px' }">
          <div>
            <h2 :style="{ fontSize: '2rem', fontWeight: '900', color: '#1A1614', letterSpacing: '-0.5px' }">Biblioteca</h2>
            <div :style="{ display: 'flex', gap: '20px', marginTop: '10px' }">
              <span 
                v-for="tab in tabs" :key="tab" 
                @click="activeTab = tab"
                :style="activeTab === tab ? activeTabLinkStyle : inactiveTabLinkStyle"
              >
                {{ tab }}
              </span>
            </div>
          </div>
          
          <div :style="ytSearchBoxStyle">
            <Search :size="20" :style="{ color: '#FF7A1A' }" />
            <input v-model="searchQuery" type="text" placeholder="Buscar en tu biblioteca" :style="ytSearchInputStyle" />
          </div>
        </div>

        <!-- PLAYLIST DETAIL VIEW -->
        <div v-if="selectedPlaylist" :style="{ animation: 'fadeIn 0.4s ease' }">
          <button @click="selectedPlaylist = null" :style="backButtonStyle">
            <ArrowLeft :size="20" /> Volver a Biblioteca
          </button>

          <div :style="playlistHeaderStyle">
            <div :style="playlistImageLargeStyle">
              <img :src="selectedPlaylist.image" :style="{ width: '100%', height: '100%', objectFit: 'cover' }" />
            </div>
            <div :style="{ flex: 1 }">
              <div :style="{ color: '#FF7A1A', fontWeight: '800', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase' }">Playlist Personalizada</div>
              <h2 :style="{ fontSize: '3rem', fontWeight: '900', color: '#1A1614', marginBottom: '15px' }">{{ selectedPlaylist.title }}</h2>
              <div :style="{ display: 'flex', alignItems: 'center', gap: '15px' }">
                <div :style="{ fontWeight: '700', color: '#666' }">Jonathan R. • {{ playlistSongs.length }} canciones</div>
                <button :style="playAllBtnStyle"><Play :size="20" fill="#fff" /> Reproducir Todo</button>
              </div>
            </div>
          </div>

          <!-- Songs List Table -->
          <div :style="{ marginTop: '50px' }">
            <div :style="tableHeaderStyle">
              <div :style="{ flex: 0.5 }">#</div>
              <div :style="{ flex: 3 }">Título</div>
              <div :style="{ flex: 2 }">Álbum</div>
              <div :style="{ flex: 1, textAlign: 'right' }"><Clock :size="18" /></div>
            </div>
            <div v-for="(song, idx) in playlistSongs" :key="song.id" @click="playSong(song)" class="song-row" :style="songRowStyle">
              <div :style="{ flex: 0.5, color: '#A0A0A0', fontWeight: '600' }">{{ idx + 1 }}</div>
              <div :style="{ flex: 3, display: 'flex', alignItems: 'center', gap: '15px' }">
                <img :src="song.image" :style="{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }" />
                <div>
                  <div :style="{ fontWeight: '700', color: '#1A1614' }">{{ song.title }}</div>
                  <div :style="{ fontSize: '0.85rem', color: '#A0A0A0' }">{{ song.artist }}</div>
                </div>
              </div>
              <div :style="{ flex: 2, color: '#666', fontSize: '0.9rem' }">{{ song.album }}</div>
              <div :style="{ flex: 1, textAlign: 'right', color: '#A0A0A0', fontSize: '0.9rem' }">{{ song.duration }}</div>
            </div>
          </div>
        </div>

        <!-- GRID VIEW (Songs/Albums/Playlists) -->
        <div v-else>
          <!-- Genre Filters (Only for Songs/Albums) -->
          <div v-if="activeTab !== 'Playlist'" :style="{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }">
            <button @click="selectedGenre = 'Todos'" :style="selectedGenre === 'Todos' ? activePillStyle : inactivePillStyle">Todos</button>
            <button v-for="genre in musicalGenres" :key="genre" @click="selectedGenre = genre" :style="selectedGenre === genre ? activePillStyle : inactivePillStyle">{{ genre }}</button>
          </div>

          <!-- Grid Container -->
          <div :style="gridContainerStyle">
            <!-- CREATE PLAYLIST BUTTON -->
            <div v-if="activeTab === 'Playlist'" @click="showCreateModal = true" class="yt-card" :style="createPlaylistCardStyle">
              <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }">
                <Plus :size="50" :style="{ color: '#FF7A1A' }" />
                <div :style="{ fontWeight: '800', color: '#1A1614', fontSize: '1.1rem' }">Nueva Playlist</div>
              </div>
            </div>

            <div v-for="item in filteredItems" :key="item.id" @click="handleItemClick(item)" class="yt-card" :style="cardStyle">
              <div :style="imageContainerStyle">
                <img :src="item.image" :style="{ width: '100%', height: '100%', objectFit: 'cover' }" />
                <div v-if="activeTab !== 'Playlist'" class="play-overlay" :style="overlayStyle"><Play :size="40" fill="#fff" :style="{ color: '#fff' }" /></div>
              </div>
              <div :style="{ marginTop: '15px' }">
                <div :style="{ fontWeight: '700', fontSize: '1.1rem', color: '#1A1614', marginBottom: '4px' }">{{ item.title }}</div>
                <div :style="{ fontSize: '0.9rem', color: '#A0A0A0', fontWeight: '500' }">{{ item.artist || (item.songsCount + ' canciones') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Player />

    <!-- CREATE PLAYLIST MODAL -->
    <div v-if="showCreateModal" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <h3 :style="{ fontSize: '1.5rem', fontWeight: '900', color: '#1A1614', marginBottom: '10px' }">Crear Nueva Lista</h3>
        <p :style="{ color: '#666', fontSize: '0.95rem', marginBottom: '30px' }">Personaliza tu nueva lista de reproducción</p>
        
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '25px' }">
          <div :style="imageUploadBoxStyle">
            <Camera :size="32" :style="{ color: '#FF7A1A' }" />
            <span :style="{ fontSize: '0.85rem', fontWeight: '700', color: '#A0A0A0', marginTop: '10px' }">Elegir Foto</span>
          </div>
          <div :style="{ display: 'flex', flexDirection: 'column', gap: '8px' }">
            <label :style="{ fontSize: '0.85rem', fontWeight: '800', color: '#1A1614' }">Nombre de la lista</label>
            <input v-model="newPlaylistName" type="text" placeholder="Ej: Mis favoritas 2024" :style="modalInputStyle" />
          </div>
          <div :style="{ display: 'flex', gap: '15px', marginTop: '10px' }">
            <button @click="showCreateModal = false" :style="modalCancelBtnStyle">Cancelar</button>
            <button @click="handleCreatePlaylist" :style="modalCreateBtnStyle">Crear Playlist</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, Music, Play, Plus, Camera, ArrowLeft, Clock } from 'lucide-vue-next';
import Sidebar from '@/components/Sidebar.vue';
import Player from '@/components/Player.vue';
import { playSong } from '@/playerState';

const activeTab = ref('Me gustas');
const searchQuery = ref('');
const selectedGenre = ref('Todos');
const selectedPlaylist = ref(null);
const tabs = ['Me gustas', 'Playlist', 'Álbumes'];
const musicalGenres = ['Pop Latino', 'Reggaetón', 'Trap', 'Urbano', 'Rock', 'Indie'];

const showCreateModal = ref(false);
const newPlaylistName = ref('');

const likedSongs = ref([
  { id: 1, title: 'Baila Conmigo', artist: 'Jonathan R.', genre: 'Pop Latino', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', album: 'Mango Summer', duration: '3:45' },
  { id: 2, title: 'Noche de Verano', artist: 'Jonathan R.', genre: 'Reggaetón', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop', album: 'Single', duration: '3:12' },
  { id: 3, title: 'Tropical Flow', artist: 'Jonathan R.', genre: 'Trap', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop', album: 'Urbano Pack', duration: '2:58' },
]);

const playlists = ref([
  { id: 101, title: 'Favoritas de siempre', songsCount: 12, image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop' },
  { id: 102, title: 'Relax & Chill', songsCount: 8, image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?w=400&h=400&fit=crop' },
]);

const playlistSongs = ref([
  { id: 501, title: 'Luz de Luna', artist: 'Jonathan R.', album: 'Favoritas', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop', duration: '3:20' },
  { id: 502, title: 'Arena y Sal', artist: 'Jonathan R.', album: 'Summer Vibes', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop', duration: '3:50' },
  { id: 503, title: 'Ritmo Urbano', artist: 'Jonathan R.', album: 'Street Mix', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop', duration: '4:10' },
]);

const albums = ref([
  { id: 201, title: 'Mango Summer', artist: 'Jonathan R.', genre: 'Pop Latino', image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=400&h=400&fit=crop' },
]);

const filteredItems = computed(() => {
  let source = [];
  if (activeTab.value === 'Me gustas') source = likedSongs.value;
  else if (activeTab.value === 'Playlist') source = playlists.value;
  else if (activeTab.value === 'Álbumes') source = albums.value;

  if (selectedGenre.value !== 'Todos' && activeTab.value !== 'Playlist') {
    source = source.filter(i => i.genre === selectedGenre.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    source = source.filter(i => i.title.toLowerCase().includes(q) || (i.artist && i.artist.toLowerCase().includes(q)));
  }
  return source;
});

const handleItemClick = (item) => {
  if (activeTab.value === 'Playlist') selectedPlaylist.value = item;
  else playSong(item);
};

const handleCreatePlaylist = () => {
  if (!newPlaylistName.value) return;
  playlists.value.unshift({ id: Date.now(), title: newPlaylistName.value, songsCount: 0, image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop' });
  newPlaylistName.value = '';
  showCreateModal.value = false;
};

// STYLES
const libraryContainerStyle = { backgroundColor: '#FFF', padding: '60px', borderRadius: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.02)', minHeight: '85vh' };
const activeTabLinkStyle = { fontSize: '1.1rem', fontWeight: '800', color: '#FF7A1A', cursor: 'pointer', borderBottom: '3px solid #FF7A1A', paddingBottom: '5px' };
const inactiveTabLinkStyle = { ...activeTabLinkStyle, color: '#A0A0A0', fontWeight: '600', borderBottom: '3px solid transparent' };
const ytSearchBoxStyle = { display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#F9F9F9', padding: '12px 25px', borderRadius: '30px', width: '400px', border: '1px solid #EEE' };
const ytSearchInputStyle = { border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '1.1rem', fontWeight: '600', width: '100%' };
const activePillStyle = { padding: '10px 25px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '20px', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer' };
const inactivePillStyle = { ...activePillStyle, backgroundColor: '#F5F5F5', color: '#666', fontWeight: '600' };
const gridContainerStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '40px 30px' };
const cardStyle = { cursor: 'pointer', transition: '0.3s' };
const imageContainerStyle = { position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '15px', overflow: 'hidden' };
const overlayStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.3s' };
const createPlaylistCardStyle = { aspectRatio: '1', backgroundColor: '#FDFCFB', border: '2px dashed #EEE', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' };

// PLAYLIST DETAIL STYLES
const backButtonStyle = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'transparent', border: 'none', color: '#666', fontWeight: '700', cursor: 'pointer', marginBottom: '30px', fontSize: '1rem' };
const playlistHeaderStyle = { display: 'flex', alignItems: 'flex-end', gap: '40px' };
const playlistImageLargeStyle = { width: '250px', height: '250px', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' };
const playAllBtnStyle = { padding: '12px 30px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '30px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginLeft: '20px' };
const tableHeaderStyle = { display: 'flex', padding: '0 25px 15px', borderBottom: '1px solid #F0F0F0', color: '#A0A0A0', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' };
const songRowStyle = { display: 'flex', alignItems: 'center', padding: '15px 25px', borderRadius: '20px', cursor: 'pointer', transition: '0.2s' };

// MODAL STYLES
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000 };
const modalContentStyle = { backgroundColor: '#FFF', padding: '45px', borderRadius: '40px', width: '480px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' };
const imageUploadBoxStyle = { width: '150px', height: '150px', backgroundColor: '#FFF9F5', borderRadius: '25px', border: '2px dashed #FFDAB9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' };
const modalInputStyle = { padding: '15px 20px', borderRadius: '12px', border: '1px solid #F0F0F0', backgroundColor: '#FBFBFB', fontSize: '1rem', outline: 'none' };
const modalCancelBtnStyle = { flex: 1, padding: '14px', backgroundColor: '#F5F5F5', color: '#666', border: 'none', borderRadius: '15px', fontWeight: '800', cursor: 'pointer' };
const modalCreateBtnStyle = { flex: 1, padding: '14px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '15px', fontWeight: '800', cursor: 'pointer' };
</script>

<style scoped>
.yt-card:hover { transform: translateY(-8px); }
.yt-card:hover .play-overlay { opacity: 1 !important; }
.song-row:hover { background-color: #F9F9F9; transform: scale(1.01); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
