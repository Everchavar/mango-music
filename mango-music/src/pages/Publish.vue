<template>
  <div :style="{ display: 'flex', backgroundColor: '#FDFCFB', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px', paddingBottom: '120px' }">
      <!-- Page Header -->
      <h1 :style="{ fontSize: '1.5rem', fontWeight: '800', color: '#000', marginBottom: '30px' }">Publicar</h1>

      <!-- Tabs -->
      <div :style="{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px' }">
        <div @click="activeTab = 'publish'" :style="activeTab === 'publish' ? activeTabStyle : inactiveTabStyle">Nueva Publicación</div>
        <div @click="activeTab = 'drafts'" :style="activeTab === 'drafts' ? activeTabStyle : inactiveTabStyle">
          Mis Borradores <span :style="{ marginLeft: '5px', opacity: 0.5 }">{{ drafts.length }}</span>
        </div>
      </div>

      <!-- PUBLISH TAB -->
      <div v-if="activeTab === 'publish'" :style="{ maxWidth: '900px', margin: '0 auto' }">
        <!-- Format Selection -->
        <p :style="{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginBottom: '20px' }">Selecciona el formato que quieres cargar:</p>
        <div :style="{ display: 'flex', gap: '20px', marginBottom: '40px' }">
          <button @click="contentType = 'video'" :style="contentType === 'video' ? videoBtnActiveStyle : videoBtnInactiveStyle">
            <Play :size="18" fill="#FFF" /> Video (MP4)
          </button>
          <button @click="contentType = 'audio'" :style="contentType === 'audio' ? musicBtnActiveStyle : musicBtnInactiveStyle">
            <Music :size="18" :style="{ color: '#FF7A1A' }" /> Música (MP3)
          </button>
        </div>

        <!-- MAIN WHITE CARD -->
        <div :style="mainCardStyle">
          <!-- Dropzone Card -->
          <div :style="dropzoneCardStyle">
            <div :style="{ marginBottom: '15px' }">
              <Upload :size="32" :style="{ color: '#FF7A1A' }" />
            </div>
            <h3 :style="{ fontSize: '1.4rem', fontWeight: '800', color: '#1A1614', marginBottom: '8px' }">Arrastra tu archivo aquí</h3>
            <p :style="{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '25px' }">O si lo prefieres, búscalo en tu equipo</p>
            <button :style="selectFileButtonStyle">Seleccionar Archivo</button>
          </div>

          <!-- Form Section -->
          <div :style="{ marginTop: '60px' }">
            <h3 :style="{ textAlign: 'center', fontSize: '1.3rem', fontWeight: '800', color: '#000', marginBottom: '40px' }">Colocar información del archivo</h3>
            
            <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px' }">
              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Título del contenido</label>
                <input type="text" placeholder="Ej: Mi Gran Lanzamiento" :style="inputStyle" />
              </div>
              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Género principal</label>
                <input type="text" placeholder="Ej: Pop Latino, Trap..." :style="inputStyle" />
              </div>
              
              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Nombre del Artista</label>
                <input type="text" placeholder="Nombre que aparecerá" :style="inputStyle" />
              </div>
              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Fecha de lanzamiento</label>
                <input type="date" :style="inputStyle" />
              </div>

              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Autor / Compositor</label>
                <input type="text" placeholder="Nombre completo" :style="inputStyle" />
              </div>
              <div :style="fieldGroupStyle">
                <label :style="labelStyle">Repertorio de derechos</label>
                <input type="text" placeholder="Entidad o propietario" :style="inputStyle" />
              </div>
            </div>

            <div :style="{ ...fieldGroupStyle, marginTop: '20px' }">
              <label :style="labelStyle">Descripción breve</label>
              <textarea placeholder="Cuéntanos un poco sobre este lanzamiento..." :style="{ ...inputStyle, minHeight: '100px', resize: 'none' }"></textarea>
            </div>
          </div>

          <!-- Action Buttons (RESTORING) -->
          <div :style="{ display: 'flex', gap: '20px', marginTop: '50px', justifyContent: 'center' }">
            <button :style="publishButtonStyle">Publicar Ahora</button>
            <button :style="draftButtonStyle">Guardar en Borradores</button>
          </div>
        </div>
      </div>

      <!-- DRAFTS TAB (VERTICAL CARDS GRID) -->
      <div v-else :style="{ maxWidth: '1100px', margin: '0 auto' }">
        <div :style="draftsGridStyle">
          <div v-for="draft in drafts" :key="draft.id" class="draft-card-hover" :style="draftCardStyle">
            <div :style="draftThumbStyle">
              <component :is="draft.type === 'video' ? Play : Music" :size="40" :style="{ color: '#FF7A1A' }" />
            </div>
            <div>
              <h4 :style="{ fontSize: '1.2rem', fontWeight: '900', color: '#1A1614', marginBottom: '8px' }">{{ draft.title }}</h4>
              <p :style="{ fontSize: '0.85rem', color: '#A0A0A0', fontWeight: '600' }">{{ draft.date }} • {{ draft.type === 'video' ? 'Video' : 'Audio' }}</p>
            </div>
            <div :style="{ width: '100%', marginTop: 'auto' }">
              <button @click="continueEditing(draft)" :style="draftEditBtnStyle">Continuar Editando</button>
              <button @click="deleteDraft(draft.id)" :style="draftDeleteBtnStyle">Eliminar Borrador</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Player />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Play, Music, Upload } from 'lucide-vue-next';
import Sidebar from '@/components/Sidebar.vue';
import Player from '@/components/Player.vue';

const activeTab = ref('publish');
const contentType = ref('video');

const drafts = ref([
  { id: 1, title: 'Próximo Hit de Verano', type: 'audio', date: 'Hace 2 horas' },
  { id: 2, title: 'Video Clip Oficial - Bogotá', type: 'video', date: 'Ayer' },
  { id: 3, title: 'Colaboración Urbana (Demo)', type: 'audio', date: 'Hace 3 días' },
]);

const deleteDraft = (id) => {
  drafts.value = drafts.value.filter(d => d.id !== id);
};

const continueEditing = (draft) => {
  contentType.value = draft.type;
  activeTab.value = 'publish';
};

// ACTION BUTTON STYLES
const publishButtonStyle = {
  padding: '18px 60px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '20px',
  fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', boxShadow: '0 15px 35px rgba(255,122,26,0.35)'
};
const draftButtonStyle = {
  padding: '18px 40px', backgroundColor: '#F5F5F5', color: '#666', border: 'none', borderRadius: '20px',
  fontSize: '1rem', fontWeight: '700', cursor: 'pointer'
};

// TAB STYLES
const activeTabStyle = {
  fontSize: '1rem', fontWeight: '800', color: '#FF7A1A', cursor: 'pointer', borderBottom: '3px solid #FF7A1A', paddingBottom: '8px'
};
const inactiveTabStyle = {
  ...activeTabStyle, color: '#A0A0A0', fontWeight: '600', borderBottom: '3px solid transparent'
};

// CONTENT TYPE BUTTONS
const videoBtnActiveStyle = {
  flex: 1, padding: '15px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '15px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '800', cursor: 'pointer'
};
const videoBtnInactiveStyle = {
  ...videoBtnActiveStyle, backgroundColor: '#FFF', color: '#A0A0A0', border: '1.5px solid #EEE'
};
const musicBtnActiveStyle = {
  flex: 1, padding: '15px', backgroundColor: '#FFF', color: '#FF7A1A', border: '2px solid #FF7A1A', borderRadius: '15px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '800', cursor: 'pointer'
};
const musicBtnInactiveStyle = {
  ...musicBtnActiveStyle, color: '#A0A0A0', border: '1.5px solid #EEE'
};

// DRAFT STYLES (VERTICAL CARDS)
const draftsGridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
  gap: '30px' 
};
const draftCardStyle = {
  backgroundColor: '#FFF', 
  padding: '30px', 
  borderRadius: '35px',
  boxShadow: '0 15px 40px rgba(0,0,0,0.03)', 
  border: '1px solid #F8F8F8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s'
};
const draftThumbStyle = {
  width: '100px', 
  height: '100px', 
  backgroundColor: '#FFF9F5', 
  borderRadius: '25px',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  marginBottom: '20px'
};
const draftEditBtnStyle = {
  width: '100%',
  padding: '12px', 
  backgroundColor: '#FF7A1A', 
  color: '#FFF', 
  border: 'none', 
  borderRadius: '15px',
  fontSize: '0.95rem', 
  fontWeight: '800', 
  cursor: 'pointer',
  marginTop: '20px'
};
const draftDeleteBtnStyle = {
  padding: '12px', 
  backgroundColor: '#FFF0F0', 
  color: '#FF4B4B', 
  border: 'none', 
  borderRadius: '15px',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer',
  marginTop: '10px',
  width: '100%'
};

// FORM STYLES
const mainCardStyle = { backgroundColor: '#FFF', padding: '50px', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' };
const dropzoneCardStyle = {
  backgroundColor: '#FFF9F5', border: '1px solid #FFEFE5', borderRadius: '30px', padding: '60px',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
};
const selectFileButtonStyle = {
  backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', padding: '12px 30px', borderRadius: '12px',
  fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer'
};
const fieldGroupStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: '800', color: '#1A1614' };
const inputStyle = {
  padding: '15px 20px', borderRadius: '12px', border: '1px solid #F0F0F0', backgroundColor: '#FBFBFB',
  fontSize: '0.95rem', color: '#333', outline: 'none'
};
</script>
