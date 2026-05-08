<template>
  <AuthLayout 
    title="Bienvenido" 
    subtitle="de vuelta" 
    description="Tu comunidad musical te está esperando."
  >
    <form @submit.prevent="handleLogin" :style="{ display: 'flex', flexDirection: 'column', gap: '25px' }">
      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Correo Electrónico</label>
        <input type="email" placeholder="tu@correo.com" :style="inputStyle" required />
      </div>

      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Contraseña</label>
        <input type="password" placeholder="••••••••" :style="inputStyle" required />
      </div>

      <div :style="{ textAlign: 'right' }">
        <span 
          @click="router.push('/forgot-password')" 
          :style="{ color: '#FF7A1A', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }"
        >
          ¿Olvidaste tu contraseña?
        </span>
      </div>

      <div>
        <label :style="{ ...labelStyle, display: 'block', marginBottom: '15px' }">Tipo de cuenta</label>
        <div :style="{ display: 'flex', gap: '10px', flexWrap: 'wrap' }">
          <button 
            v-for="type in accountTypes" 
            :key="type"
            type="button"
            @click="accountType = type"
            :style="{
              padding: '10px 25px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: '0.2s',
              backgroundColor: accountType === type ? '#FF7A1A' : '#F5F5F5',
              color: accountType === type ? '#fff' : '#666',
              border: 'none',
              cursor: 'pointer'
            }"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <button type="submit" :style="{ 
        backgroundColor: '#FF7A1A', 
        color: '#fff', 
        padding: '18px', 
        borderRadius: '12px', 
        fontWeight: '700', 
        fontSize: '1.1rem', 
        marginTop: '10px',
        boxShadow: '0 4px 15px rgba(255, 122, 26, 0.2)',
        cursor: 'pointer'
      }">
        Ingresar
      </button>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/components/AuthLayout.vue';

const router = useRouter();
const accountType = ref('Artista');
const accountTypes = ['Artista', 'Público', 'Productor', 'Entidad Cultural'];

const handleLogin = () => {
  router.push('/dashboard');
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: '500',
  color: '#444'
};

const inputStyle = {
  padding: '15px 20px',
  borderRadius: '12px',
  border: '1px solid #F0F0F0',
  backgroundColor: '#FAFAFA',
  fontSize: '1rem',
  color: '#333',
  width: '100%'
};
</script>
