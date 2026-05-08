<template>
  <div v-if="showTerms">
    <TermsPage @accept="handleAcceptTerms" @back="showTerms = false" />
  </div>

  <AuthLayout 
    v-else
    title="Tu música," 
    subtitle="Tu Comunidad." 
    description="Únete a la comunidad de artistas independientes más grande de Latinoamérica."
  >
    <form @submit.prevent="handleRegister" :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Nombre Completo</label>
        <input type="text" placeholder="Tu nombre completo" :style="inputStyle" />
      </div>
      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Nombre Artístico</label>
        <input type="text" placeholder="Nombre artístico o banda" :style="inputStyle" />
      </div>
      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Correo Electrónico</label>
        <input type="email" placeholder="tu@correo.com" :style="inputStyle" />
      </div>

      <div :style="{ display: 'flex', gap: '20px' }">
        <div :style="{ ...fieldGroupStyle, flex: 1 }">
          <label :style="labelStyle">Fecha Nacimiento</label>
          <input type="text" placeholder="DD/MM/AAAA" :style="inputStyle" />
        </div>
        <div :style="{ ...fieldGroupStyle, flex: 1 }">
          <label :style="labelStyle">Género Musical</label>
          <select :style="inputStyle">
            <option>Selecciona...</option>
            <option v-for="genre in genres" :key="genre">{{ genre }}</option>
          </select>
        </div>
      </div>

      <div :style="fieldGroupStyle">
        <label :style="labelStyle">Contraseña</label>
        <input type="password" placeholder="••••••••" :style="inputStyle" />
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

      <div :style="{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }">
        <input 
          type="checkbox" 
          id="terms" 
          v-model="termsAccepted"
          :style="{ width: '20px', height: '20px', accentColor: '#FF7A1A', cursor: 'pointer' }" 
        />
        <label for="terms" :style="{ fontSize: '0.9rem', color: '#666', cursor: 'pointer' }">
          Acepto los <span @click.stop="showTerms = true" :style="{ color: '#FF7A1A', fontWeight: '600', textDecoration: 'underline' }">Términos y Condiciones</span> de Mango Music
        </label>
      </div>

      <button 
        type="submit" 
        :disabled="!termsAccepted"
        :style="{ 
          backgroundColor: termsAccepted ? '#FF7A1A' : '#CCC', 
          color: '#fff', 
          padding: '18px', 
          borderRadius: '12px', 
          fontWeight: '700', 
          fontSize: '1.1rem', 
          marginTop: '10px',
          boxShadow: termsAccepted ? '0 4px 15px rgba(255, 122, 26, 0.2)' : 'none',
          cursor: termsAccepted ? 'pointer' : 'not-allowed',
          transition: '0.3s'
        }"
      >
        Crear Cuenta
      </button>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import AuthLayout from '@/components/AuthLayout.vue';
import TermsPage from './TermsPage.vue';

const showTerms = ref(false);
const termsAccepted = ref(false);
const accountType = ref('Artista');

const genres = ['Pop', 'Rock', 'Hip-Hop', 'Reggaetón', 'Electrónica', 'Ranchera', 'Jazz', 'Bachata', 'Merengue', 'Salsa'];
const accountTypes = ['Artista', 'Público', 'Productor', 'Entidad Cultural'];

const handleAcceptTerms = () => {
  termsAccepted.value = true;
  showTerms.value = false;
};

const handleRegister = () => {
  // Logic here
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
