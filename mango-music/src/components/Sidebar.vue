<template>
  <div class="sidebar" :style="sidebarStyle">
    <!-- Branding -->
    <div :style="{ marginBottom: '40px', padding: '0 10px' }">
      <div :style="{ display: 'flex', alignItems: 'center', gap: '12px' }">
        <img src="@/assets/logo.png" alt="Logo" :style="{ width: '42px', height: '42px', objectFit: 'contain' }" />
        <div>
          <div :style="{ color: '#FFF', fontWeight: '800', fontSize: '1.2rem' }">Mango Music</div>
          <div :style="{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', marginTop: '-2px' }">Tu música, Tu Comunidad</div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav :style="{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }">
      <div 
        v-for="(item, index) in menuItems" 
        :key="index" 
        @click="navigateTo(item.route)"
        :style="{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          borderRadius: '12px',
          cursor: 'pointer',
          backgroundColor: route.path === item.route ? '#FF7A1A' : 'transparent',
          color: route.path === item.route ? '#FFF' : '#A0A0A0',
          transition: 'all 0.3s ease'
        }"
      >
        <span :style="{ marginRight: '15px', display: 'flex' }">
          <component :is="item.icon" :size="20" />
        </span>
        <span :style="{ fontSize: '0.95rem', fontWeight: route.path === item.route ? '700' : '500' }">
          {{ item.label }}
        </span>
      </div>
    </nav>

    <!-- FOOTER LOGO DECORATION (Optional) -->
    <div :style="{ marginTop: 'auto', textAlign: 'center', opacity: 0.1 }">
      <img src="@/assets/logo.png" width="80" />
    </div>
  </div>
</template>

<script setup>
import { 
  LayoutDashboard, PlusCircle, Library, DollarSign, Settings as SettingsIcon, Music 
} from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Removed "Perfil" from the navigation list as requested
const menuItems = [
  { icon: LayoutDashboard, label: 'Inicio', route: '/dashboard' },
  { icon: PlusCircle, label: 'Publicar', route: '/publicar' },
  { icon: Music, label: 'Biblioteca', route: '/biblioteca' },
  { icon: DollarSign, label: 'Monetización', route: '/monetizacion' },
  { icon: SettingsIcon, label: 'Configuración', route: '/configuracion' },
];

const navigateTo = (path) => { router.push(path); };

const sidebarStyle = {
  width: '260px',
  height: '100vh',
  background: '#1A1614',
  padding: '30px 20px',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  left: 0,
  top: 0,
  boxSizing: 'border-box',
  zIndex: 3000
};
</script>
