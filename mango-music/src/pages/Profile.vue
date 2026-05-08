<template>
  <div :style="{ display: 'flex', backgroundColor: '#F8F5F2', minHeight: '100vh', paddingBottom: '120px' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px' }">
      <!-- Artist Profile Header -->
      <div :style="profileBannerStyle">
        <div :style="{ display: 'flex', alignItems: 'flex-end', gap: '30px', height: '100%' }">
          <div :style="largeAvatarContainerStyle" @click="triggerImageUpload">
            <img v-if="avatarImage" :src="avatarImage" :style="{ width: '100%', height: '100%', objectFit: 'cover' }" />
            <User v-else :size="80" :style="{ color: '#FF7A1A' }" />
            <div :style="avatarOverlayStyle" class="avatar-hover">
              <Camera :size="30" />
            </div>
            <input type="file" ref="fileInput" @change="handleImageChange" accept="image/*" style="display: none" />
          </div>

          <div :style="{ flex: 1, paddingBottom: '10px' }">
            <div :style="{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }">
              <span :style="verifiedBadgeStyle">Artista Verificado</span>
            </div>
            <h1 :style="{ fontSize: '4.5rem', fontWeight: '900', color: '#fff', margin: '0', lineHeight: '1', letterSpacing: '-2px' }">{{ artistName }}</h1>
            <div :style="{ display: 'flex', gap: '30px', marginTop: '20px' }">
              <div v-for="stat in stats" :key="stat.label" :style="{ textAlign: 'left' }">
                <div :style="{ fontSize: '1.5rem', fontWeight: '900', color: '#fff' }">{{ stat.value }}</div>
                <div :style="{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: '700', textTransform: 'uppercase' }">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <button @click="isEditingProfile = true" :style="editButtonStyle">
            <Settings :size="20" /> Editar Perfil
          </button>
        </div>
      </div>

      <!-- Biography Section -->
      <div :style="bioSectionStyle">
        <h3 :style="{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: '#1A1614' }">Biografía</h3>
        <p :style="{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }">
          {{ bioText }}
        </p>
      </div>

      <!-- Songs List Section with Search -->
      <div :style="{ marginTop: '50px' }">
        <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }">
          <h2 :style="{ fontSize: '1.8rem', fontWeight: '800', color: '#1A1614' }">Tus Canciones</h2>
          
          <!-- SEARCH BAR FOR SONGS -->
          <div :style="songSearchContainerStyle">
            <Search :size="18" :style="{ color: '#A0A0A0' }" />
            <input v-model="songSearchQuery" type="text" placeholder="Buscar entre tus canciones..." :style="songSearchInputStyle" />
          </div>
        </div>

        <div :style="{ display: 'flex', flexDirection: 'column', gap: '12px' }">
          <div v-for="(song, index) in filteredSongs" :key="song.id" :style="songRowStyle">
            <div :style="{ width: '30px', color: '#A0A0A0', fontWeight: '800' }">{{ index + 1 }}</div>
            <div :style="songThumbnailStyle">
              <img v-if="song.cover" :src="song.cover" :style="{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }" />
              <Music v-else :size="18" :style="{ color: '#FF7A1A' }" />
              <Pin v-if="song.isPinned" :size="12" :style="{ position: 'absolute', top: -5, right: -5, color: '#FF7A1A' }" />
            </div>
            <div :style="{ flex: 1 }">
              <div :style="{ fontWeight: '800', fontSize: '1.1rem', color: '#1A1614', display: 'flex', alignItems: 'center', gap: '10px' }">
                {{ song.title }}
                <span v-if="song.isArchived" :style="badgeStyle">Archivado</span>
                <span v-if="song.isHidden" :style="{ ...badgeStyle, backgroundColor: '#666' }">Oculto</span>
              </div>
              <div :style="{ color: '#A0A0A0', fontSize: '0.85rem', fontWeight: '600' }">{{ song.genre }} • {{ song.duration }}</div>
            </div>
            
            <div :style="{ color: '#FF7A1A', fontWeight: '800', fontSize: '0.9rem', marginRight: '30px' }">{{ song.plays || '0' }} oyentes</div>
            
            <!-- Management Menu -->
            <div :style="{ position: 'relative' }">
              <div @click="activeMenu = activeMenu === song.id ? null : song.id" style="cursor: pointer; padding: 10px;">
                <MoreHorizontal :size="24" :style="{ color: '#A0A0A0' }" />
              </div>

              <div v-if="activeMenu === song.id" :style="actionsMenuStyle">
                <div @click="openModifySong(song)" class="menu-item" :style="menuItemStyle"><Edit3 :size="16" /> Modificar</div>
                <div @click="pinSong(song)" class="menu-item" :style="menuItemStyle"><Pin :size="16" /> {{ song.isPinned ? 'Desfijar' : 'Fijar' }}</div>
                <div @click="archiveSong(song)" class="menu-item" :style="menuItemStyle"><Archive :size="16" /> {{ song.isArchived ? 'Desarchivar' : 'Archivar' }}</div>
                <div @click="hideSong(song)" class="menu-item" :style="menuItemStyle"><EyeOff :size="16" /> {{ song.isHidden ? 'Mostrar' : 'Ocultar' }}</div>
                <div @click="deleteSong(index)" class="menu-item" :style="{ ...menuItemStyle, color: '#ff4444' }"><Trash2 :size="16" /> Eliminar</div>
              </div>
            </div>
          </div>
          
          <!-- EMPTY STATE FOR SEARCH -->
          <div v-if="filteredSongs.length === 0" :style="{ textAlign: 'center', padding: '50px' }">
            <p :style="{ color: '#A0A0A0', fontSize: '1.1rem', fontWeight: '600' }">No se encontraron canciones que coincidan con "{{ songSearchQuery }}"</p>
          </div>
        </div>
      </div>

      <!-- Modals... (omitted for brevity but kept in actual file) -->
      <div v-if="isModifying" :style="modalOverlayStyle">
        <div :style="modalContentStyle">
          <h2 :style="{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '25px' }">Modificar Canción</h2>
          <div :style="{ textAlign: 'center', marginBottom: '25px' }">
            <div :style="songCoverEditStyle" @click="triggerSongCoverUpload">
              <img v-if="tempSong.cover" :src="tempSong.cover" :style="{ width: '100%', height: '100%', objectFit: 'cover' }" />
              <Music v-else :size="40" :style="{ color: '#FF7A1A' }" />
              <div :style="cameraOverlayStyle"><Camera :size="20" /></div>
            </div>
            <input type="file" ref="songCoverInput" @change="handleSongCoverChange" style="display: none" accept="image/*" />
          </div>
          <div :style="{ marginBottom: '20px' }">
            <label :style="modalLabelStyle">Título de la Canción</label>
            <input v-model="tempSong.title" :style="modalInputStyle" />
          </div>
          <div :style="{ marginBottom: '30px' }">
            <label :style="modalLabelStyle">Género</label>
            <input v-model="tempSong.genre" :style="modalInputStyle" />
          </div>
          <div :style="{ display: 'flex', gap: '15px' }">
            <button @click="saveSongChanges" :style="saveButtonStyle">Guardar Cambios</button>
            <button @click="isModifying = false" :style="cancelButtonStyle">Cancelar</button>
          </div>
        </div>
      </div>

      <div v-if="isEditingProfile" :style="modalOverlayStyle">
        <div :style="modalContentStyle">
          <h2 :style="{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '25px' }">Editar Perfil</h2>
          <div :style="{ marginBottom: '20px' }">
            <label :style="modalLabelStyle">Nombre de Artista</label>
            <input v-model="tempArtistName" :style="modalInputStyle" />
          </div>
          <div :style="{ marginBottom: '20px' }">
            <label :style="modalLabelStyle">Biografía</label>
            <textarea v-model="tempBio" rows="4" :style="{ ...modalInputStyle, resize: 'none' }"></textarea>
          </div>
          <div :style="{ display: 'flex', gap: '15px' }">
            <button @click="saveProfile" :style="saveButtonStyle">Guardar</button>
            <button @click="isEditingProfile = false" :style="cancelButtonStyle">Cancelar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  User, 
  Music, 
  Heart, 
  MoreHorizontal, 
  Settings, 
  Camera,
  Pin,
  Archive,
  EyeOff,
  Trash2,
  Edit3,
  Search
} from 'lucide-vue-next';
import Sidebar from '@/components/Sidebar.vue';

const isEditingProfile = ref(false);
const isModifying = ref(false);
const activeMenu = ref(null);
const songSearchQuery = ref('');

const artistName = ref('Jonathan Rosales');
const bioText = ref('Artista de Pop Latino originario de Usulután, El Salvador. Comenzó su carrera musical en 2020 con el objetivo de llevar ritmos tropicales y letras románticas a toda Latinoamérica.');
const tempArtistName = ref(artistName.value);
const tempBio = ref(bioText.value);
const avatarImage = ref(null);
const fileInput = ref(null);
const songCoverInput = ref(null);

const stats = ref([
  { label: 'Seguidores', value: '1.2M' },
  { label: 'Oyentes Mes', value: '850k' },
  { label: 'Canciones', value: '5' }
]);

const songs = ref([
  { id: 1, title: 'Ritmo Salvaje', genre: 'Pop Latino', duration: '3:20', plays: '15.2M', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100&h=100&fit=crop', isPinned: true, isArchived: false, isHidden: false },
  { id: 2, title: 'Baila Conmigo', genre: 'Urbano', duration: '3:05', plays: '12.4M', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop', isPinned: false, isArchived: false, isHidden: false },
  { id: 3, title: 'Noche de Verano', genre: 'Tropical', duration: '3:45', plays: '8.1M', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop', isPinned: false, isArchived: false, isHidden: false },
  { id: 4, title: 'Oasis Flow', genre: 'Pop Latino', duration: '2:58', plays: '5.6M', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=100&h=100&fit=crop', isPinned: false, isArchived: false, isHidden: false },
  { id: 5, title: 'Mango Beat', genre: 'Tropical', duration: '3:12', plays: '3.2M', cover: 'https://images.unsplash.com/photo-1514525253344-99a42d7df4bf?w=100&h=100&fit=crop', isPinned: false, isArchived: false, isHidden: false },
]);

const filteredSongs = computed(() => {
  if (!songSearchQuery.value) return songs.value;
  return songs.value.filter(s => 
    s.title.toLowerCase().includes(songSearchQuery.value.toLowerCase()) ||
    s.genre.toLowerCase().includes(songSearchQuery.value.toLowerCase())
  );
});

const openModifySong = (song) => {
  tempSong.value = { ...song };
  isModifying.value = true;
  activeMenu.value = null;
};

const saveSongChanges = () => {
  const index = songs.value.findIndex(s => s.id === tempSong.value.id);
  if (index !== -1) {
    songs.value[index] = { ...tempSong.value };
  }
  isModifying.value = false;
};

const triggerSongCoverUpload = () => {
  songCoverInput.value.click();
};

const handleSongCoverChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempSong.value.cover = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const pinSong = (song) => {
  song.isPinned = !song.isPinned;
  activeMenu.value = null;
};

const archiveSong = (song) => {
  song.isArchived = !song.isArchived;
  activeMenu.value = null;
};

const hideSong = (song) => {
  song.isHidden = !song.isHidden;
  activeMenu.value = null;
};

const deleteSong = (index) => {
  if (confirm('¿Eliminar esta canción permanentemente?')) {
    songs.value.splice(index, 1);
    stats.value[2].value = songs.value.length;
  }
  activeMenu.value = null;
};

const saveProfile = () => {
  artistName.value = tempArtistName.value;
  bioText.value = tempBio.value;
  isEditingProfile.value = false;
};

const triggerImageUpload = () => {
  fileInput.value.click();
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const tempSong = ref({ id: null, title: '', genre: '', cover: null });

// Styles
const profileBannerStyle = {
  background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), linear-gradient(135deg, #FF7A1A 0%, #FF9F5A 100%)',
  height: '350px',
  borderRadius: '40px',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative'
};

const largeAvatarContainerStyle = {
  width: '180px',
  height: '180px',
  borderRadius: '45px',
  backgroundColor: '#fff',
  border: '6px solid rgba(255,255,255,0.2)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
};

const verifiedBadgeStyle = {
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: '800',
  textTransform: 'uppercase',
  backdropFilter: 'blur(10px)'
};

const avatarOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  opacity: 0,
  transition: '0.3s'
};

const editButtonStyle = {
  backgroundColor: 'rgba(255,255,255,0.15)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
  padding: '12px 25px',
  borderRadius: '15px',
  fontWeight: '700',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backdropFilter: 'blur(10px)'
};

const bioSectionStyle = {
  marginTop: '40px',
  backgroundColor: '#fff',
  padding: '30px 40px',
  borderRadius: '30px',
  border: '1px solid #eee',
  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
};

const songSearchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#fff',
  padding: '10px 20px',
  borderRadius: '20px',
  border: '1px solid #eee',
  width: '300px'
};

const songSearchInputStyle = {
  border: 'none',
  outline: 'none',
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#1A1614',
  width: '100%'
};

const songRowStyle = {
  backgroundColor: '#fff',
  padding: '18px 25px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  border: '1px solid #eee',
  transition: '0.2s'
};

const songThumbnailStyle = {
  width: '55px',
  height: '55px',
  backgroundColor: '#FFF9F5',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden'
};

const songCoverEditStyle = {
  width: '120px',
  height: '120px',
  margin: '0 auto',
  borderRadius: '20px',
  backgroundColor: '#FFF9F5',
  border: '3px dashed #FF7A1A',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const cameraOverlayStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '35%',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff'
};

const actionsMenuStyle = {
  position: 'absolute',
  top: '45px',
  right: '0',
  backgroundColor: '#fff',
  borderRadius: '18px',
  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
  zIndex: 100,
  width: '180px',
  padding: '8px',
  border: '1px solid #f0f0f0'
};

const menuItemStyle = {
  padding: '12px 15px',
  fontSize: '0.9rem',
  fontWeight: '700',
  color: '#444',
  cursor: 'pointer',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  transition: '0.2s'
};

const badgeStyle = {
  fontSize: '0.65rem',
  backgroundColor: '#FF7A1A',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '5px',
  fontWeight: '800'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.8)',
  zIndex: 5000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '35px',
  width: '450px'
};

const modalLabelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '800',
  color: '#A0A0A0',
  marginBottom: '8px',
  textTransform: 'uppercase'
};

const modalInputStyle = {
  width: '100%',
  padding: '15px 20px',
  borderRadius: '15px',
  border: '2px solid #F0F0F0',
  fontSize: '1rem',
  outline: 'none',
  backgroundColor: '#FAFAFA'
};

const saveButtonStyle = {
  flex: 1,
  padding: '15px',
  backgroundColor: '#FF7A1A',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  fontWeight: '800',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  padding: '15px 25px',
  backgroundColor: '#F5F5F5',
  color: '#A0A0A0',
  border: 'none',
  borderRadius: '15px',
  fontWeight: '700',
  cursor: 'pointer'
};
</script>

<style scoped>
.menu-item:hover {
  background-color: #FFF9F5;
  color: #FF7A1A;
}
.avatar-hover:hover {
  opacity: 1 !important;
}
</style>
