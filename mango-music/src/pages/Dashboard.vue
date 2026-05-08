<template>
  <div :style="{ display: 'flex', backgroundColor: '#F8F5F2', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px', paddingBottom: '120px' }">
      <!-- Search & User Bar -->
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }">
        <div :style="searchBoxStyle">
          <Search :size="20" :style="{ color: '#FF7A1A' }" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="¿Qué quieres escuchar hoy?" 
            :style="searchInputStyle" 
          />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center', gap: '15px' }">
          <div :style="userBadgeStyle" @click="router.push('/perfil')" style="cursor: pointer;">
            <User :size="18" :style="{ color: '#FF7A1A' }" />
            <span :style="{ fontWeight: '800', fontSize: '0.9rem', color: '#1A1614' }">Jonathan Rosales</span>
          </div>
        </div>
      </div>

      <!-- ARTIST STATS BOX (SIMPLIFIED) -->
      <div :style="statsBoxStyle">
        <div :style="statItemStyle">
          <div :style="statValueStyle">125K</div>
          <div :style="statLabelStyle">Seguidores</div>
        </div>
        <div :style="statDividerStyle"></div>
        <div :style="statItemStyle">
          <div :style="statValueStyle">450K</div>
          <div :style="statLabelStyle">Me gustas</div>
        </div>
        <div :style="statDividerStyle"></div>
        <div :style="statItemStyle">
          <div :style="statValueStyle">32</div>
          <div :style="statLabelStyle">Publicaciones</div>
        </div>
      </div>

      <!-- GLOBAL TRENDS SECTION -->
      <div :style="{ marginTop: '50px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
        <h2 :style="{ fontSize: '1.8rem', fontWeight: '900', color: '#1A1614', letterSpacing: '-0.5px' }">Tendencias Globales</h2>
        <span :style="{ color: '#FF7A1A', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem', textTransform: 'uppercase' }">Explorar Todo</span>
      </div>

      <!-- GRID WITH VARIOUS ARTISTS -->
      <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }">
        <div v-for="song in globalSongs" :key="song.id" @click="playSong(song)" class="song-card-premium" :style="songCardStyle">
          <div :style="songImageStyle(song.image)">
            <div class="play-overlay-icon" :style="playOverlayStyle">
              <Play :size="45" fill="#FFF" color="#FFF" />
            </div>
          </div>
          <div :style="{ marginTop: '18px' }">
            <div :style="{ fontWeight: '800', color: '#1A1614', fontSize: '1.1rem' }">{{ song.title }}</div>
            <div :style="{ fontSize: '0.9rem', color: '#A0A0A0', fontWeight: '600', marginTop: '2px' }">{{ song.artist }}</div>
          </div>
        </div>
      </div>
    </main>

    <Player />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search, User, Play } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Player from '@/components/Player.vue';
import { playSong } from '@/playerState';

const router = useRouter();
const searchQuery = ref('');

const globalSongs = [
  { id: 1, title: 'Provenza', artist: 'Karol G', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop' },
  { id: 2, title: 'Tití Me Preguntó', artist: 'Bad Bunny', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop' },
  { id: 3, title: 'Despechá', artist: 'Rosalía', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop' },
  { id: 4, title: 'Music Sessions #53', artist: 'Bizarrap & Shakira', image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400&h=400&fit=crop' },
  { id: 5, title: 'La Bachata', artist: 'Manuel Turizo', image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?w=400&h=400&fit=crop' },
  { id: 6, title: 'Hey Mor', artist: 'Ozuna & Feid', image: 'https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=400&h=400&fit=crop' },
];

// STYLES
const searchBoxStyle = { display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#FFF', padding: '14px 25px', borderRadius: '22px', width: '550px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #F0F0F0' };
const searchInputStyle = { border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '1rem', fontWeight: '600', width: '100%', color: '#1A1614' };
const userBadgeStyle = { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFF', padding: '12px 25px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #F0F0F0' };

const statsBoxStyle = { 
  backgroundColor: '#FFF', padding: '30px', borderRadius: '35px', boxShadow: '0 15px 45px rgba(0,0,0,0.02)', 
  border: '1px solid #F8F8F8', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
  maxWidth: '700px'
};
const statItemStyle = { textAlign: 'center', flex: 1 };
const statValueStyle = { fontSize: '2rem', fontWeight: '900', color: '#1A1614' };
const statLabelStyle = { fontSize: '0.85rem', color: '#A0A0A0', fontWeight: '700', textTransform: 'uppercase', marginTop: '5px' };
const statDividerStyle = { width: '1.5px', height: '40px', backgroundColor: '#F0F0F0' };

const songCardStyle = { backgroundColor: '#FFF', padding: '22px', borderRadius: '35px', boxShadow: '0 15px 45px rgba(0,0,0,0.03)', cursor: 'pointer', transition: '0.4s', border: '1px solid #F8F8F8' };
const songImageStyle = (img) => ({ width: '100%', height: '200px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '25px', position: 'relative', overflow: 'hidden' });
const playOverlayStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.3s' };
</script>

<style scoped>
.song-card-premium:hover { transform: translateY(-10px); }
.song-card-premium:hover .play-overlay-icon { opacity: 1 !important; }
</style>
