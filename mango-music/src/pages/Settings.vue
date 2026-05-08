<template>
  <div :style="{ display: 'flex', backgroundColor: '#F8F5F2', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px', paddingBottom: '120px' }">
      <!-- Settings Header -->
      <div :style="{ marginBottom: '35px' }">
        <h2 :style="{ fontSize: '2rem', fontWeight: '800', color: '#1A1614' }">Configuración General</h2>
      </div>

      <!-- Settings Grid Layout -->
      <div :style="{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }">
        
        <!-- Left Column: Playback Preferences -->
        <div :style="settingsCardStyle">
          <h3 :style="sectionTitleStyle">Preferencias de Reproducción</h3>
          
          <!-- Language -->
          <div :style="settingRowStyle">
            <div>
              <div :style="settingLabelStyle">Idioma</div>
              <div :style="settingSubLabelStyle">Selecciona el idioma de la app</div>
            </div>
            <div :style="languageWrapperStyle">
              <span :style="{ fontWeight: '700', fontSize: '0.95rem' }">Español</span>
              <div :style="{ width: '8px', height: '8px', backgroundColor: '#000', borderRadius: '50%', marginLeft: '10px' }"></div>
            </div>
          </div>

          <!-- Toggles -->
          <div v-for="(val, key) in toggles" :key="key" :style="settingRowStyle">
            <div>
              <div :style="settingLabelStyle">{{ val.label }}</div>
              <div :style="settingSubLabelStyle">{{ val.desc }}</div>
            </div>
            <div @click="val.active = !val.active" :style="val.active ? switchActiveStyle : switchInactiveStyle">
              <div :style="val.active ? knobActiveStyle : knobInactiveStyle"></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Account & Security -->
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '30px' }">
          <div :style="settingsCardStyle">
            <h3 :style="sectionTitleStyle">Cuenta y Seguridad</h3>
            
            <div :style="actionRowStyle" @click="showPasswordModal = true">
              <div>
                <div :style="settingLabelStyle">Cambiar Contraseña</div>
                <div :style="settingSubLabelStyle">Actualiza tu clave de acceso</div>
              </div>
              <ChevronRight :size="20" :style="{ color: '#BCBCBC' }" />
            </div>

            <div :style="actionRowStyle">
              <div>
                <div :style="settingLabelStyle">Privacidad</div>
                <div :style="settingSubLabelStyle">Gestiona tu información personal</div>
              </div>
              <ChevronRight :size="20" :style="{ color: '#BCBCBC' }" />
            </div>

            <!-- Logout -->
            <div :style="logoutRowStyle" @click="handleLogout">
              <div>
                <div :style="{ ...settingLabelStyle, color: '#FF4B4B' }">Cerrar Sesión</div>
                <div :style="{ ...settingSubLabelStyle, color: '#FF4B4B', opacity: 0.7 }">Salir de tu cuenta Mango Music</div>
              </div>
              <ChevronRight :size="20" :style="{ color: '#FF4B4B' }" />
            </div>
          </div>

          <!-- Version Info Card -->
          <div :style="versionCardStyle">
            <div :style="{ display: 'flex', alignItems: 'center', gap: '20px' }">
              <div :style="versionIconStyle">
                <img src="@/assets/logo.png" width="35" />
              </div>
              <div>
                <div :style="{ fontWeight: '900', color: '#1A1614', fontSize: '1.2rem' }">Mango Music</div>
                <div :style="{ fontSize: '0.85rem', color: '#A0A0A0', fontWeight: '500' }">Versión 1.0.0 • Todos los derechos reservados</div>
                <div :style="{ fontSize: '0.9rem', color: '#FF7A1A', fontWeight: '800', marginTop: '5px' }">Tu música, Tu Comunidad.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <Player />

    <!-- LOGOUT CONFIRMATION MODAL -->
    <div v-if="showLogoutConfirm" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <h3 :style="{ fontSize: '1.5rem', fontWeight: '900', color: '#1A1614', marginBottom: '15px' }">¿Cerrar Sesión?</h3>
        <p :style="{ color: '#666', fontSize: '1rem', marginBottom: '35px', lineHeight: '1.6' }">
          Estás a punto de salir de Mango Music. ¿Estás seguro de que quieres finalizar tu sesión actual?
        </p>
        <div :style="{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }">
          <button @click="showLogoutConfirm = false" :style="cancelButtonStyle">Cancelar</button>
          <button @click="confirmLogout" :style="confirmLogoutButtonStyle">Cerrar Sesión</button>
        </div>
      </div>
    </div>

    <!-- CHANGE PASSWORD MODAL (NEW) -->
    <div v-if="showPasswordModal" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <h3 :style="{ fontSize: '1.5rem', fontWeight: '900', color: '#1A1614', marginBottom: '10px' }">Cambiar Contraseña</h3>
        <p :style="{ color: '#666', fontSize: '0.95rem', marginBottom: '30px' }">Asegura tu cuenta con una nueva clave</p>
        
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
          <div :style="modalFieldGroupStyle">
            <label :style="modalLabelStyle">Contraseña Actual</label>
            <input type="password" placeholder="••••••••" :style="modalInputStyle" />
          </div>
          <div :style="modalFieldGroupStyle">
            <label :style="modalLabelStyle">Nueva Contraseña</label>
            <input type="password" placeholder="Mínimo 8 caracteres" :style="modalInputStyle" />
          </div>
          <div :style="modalFieldGroupStyle">
            <label :style="modalLabelStyle">Repetir Nueva Contraseña</label>
            <input type="password" placeholder="Confirmar contraseña" :style="modalInputStyle" />
          </div>

          <div @click="router.push('/forgot-password')" :style="forgotPassLinkStyle">
            ¿Se te olvidó tu contraseña?
          </div>

          <div :style="{ display: 'flex', gap: '15px', marginTop: '10px' }">
            <button @click="showPasswordModal = false" :style="cancelButtonStyle">Cancelar</button>
            <button @click="showPasswordModal = false" :style="savePasswordBtnStyle">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronRight } from 'lucide-vue-next';
import Sidebar from '@/components/Sidebar.vue';
import Player from '@/components/Player.vue';

const router = useRouter();
const showLogoutConfirm = ref(false);
const showPasswordModal = ref(false);

const handleLogout = () => {
  showLogoutConfirm.value = true;
};

const confirmLogout = () => {
  router.push('/login');
};

const toggles = reactive({
  playbackOther: { label: 'Reproduce junto con otras apps', desc: 'Permite reproducción simultánea', active: true },
  gapless: { label: 'Reproducción sin pausas', desc: 'Encadena canciones automáticamente', active: false },
  showTime: { label: 'Tiempo de Reproducción', desc: 'Muestra el tiempo al reproducir', active: true },
  notifications: { label: 'Notificaciones', desc: 'Recibe alertas de novedades y lanzamientos', active: true },
});

// STYLES
const settingsCardStyle = { backgroundColor: '#FFF', padding: '40px', borderRadius: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' };
const sectionTitleStyle = { fontSize: '1.2rem', fontWeight: '900', color: '#1A1614', marginBottom: '35px' };
const settingRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px 30px', backgroundColor: '#FDFCFB', borderRadius: '25px', marginBottom: '15px', border: '1px solid #FAF7F5' };
const actionRowStyle = { ...settingRowStyle, cursor: 'pointer' };
const logoutRowStyle = { ...actionRowStyle, backgroundColor: '#FFF5F5', border: '1px solid #FFE5E5' };
const settingLabelStyle = { fontSize: '1.05rem', fontWeight: '800', color: '#1A1614' };
const settingSubLabelStyle = { fontSize: '0.9rem', color: '#A0A0A0', marginTop: '4px', fontWeight: '500' };
const languageWrapperStyle = { padding: '10px 25px', border: '1.5px solid #EEE', borderRadius: '15px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', cursor: 'pointer' };

const switchInactiveStyle = { width: '55px', height: '30px', backgroundColor: '#DCDFE6', borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: '0.3s' };
const switchActiveStyle = { ...switchInactiveStyle, backgroundColor: '#FF7A1A' };
const knobInactiveStyle = { width: '22px', height: '22px', backgroundColor: '#FFF', borderRadius: '50%', position: 'absolute', top: '4px', left: '4px', transition: '0.3s' };
const knobActiveStyle = { ...knobInactiveStyle, left: '29px' };

const versionCardStyle = { backgroundColor: '#FFFBF5', padding: '35px', borderRadius: '35px', border: '1px solid #FFEFD5' };
const versionIconStyle = { width: '65px', height: '65px', backgroundColor: '#FFF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };

// MODAL STYLES
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
  backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000
};
const modalContentStyle = {
  backgroundColor: '#FFF', padding: '45px', borderRadius: '40px', width: '500px',
  boxShadow: '0 30px 70px rgba(0,0,0,0.15)', textAlign: 'left'
};
const cancelButtonStyle = {
  padding: '14px 25px', backgroundColor: '#F5F5F5', color: '#666', border: 'none',
  borderRadius: '15px', fontWeight: '800', cursor: 'pointer'
};
const confirmLogoutButtonStyle = {
  padding: '14px 25px', backgroundColor: '#FF4B4B', color: '#FFF', border: 'none',
  borderRadius: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px rgba(255,75,75,0.2)'
};

// PASSWORD MODAL SPECIFIC STYLES
const modalFieldGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const modalLabelStyle = { fontSize: '0.85rem', fontWeight: '800', color: '#1A1614' };
const modalInputStyle = { padding: '15px 20px', borderRadius: '15px', border: '1px solid #F0F0F0', backgroundColor: '#FBFBFB', fontSize: '0.95rem', outline: 'none' };
const forgotPassLinkStyle = { color: '#FF7A1A', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', textAlign: 'right', marginTop: '-5px' };
const savePasswordBtnStyle = { flex: 1, padding: '14px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '15px', fontWeight: '800', cursor: 'pointer' };
</script>
