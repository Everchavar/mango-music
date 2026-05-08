<template>
  <div :style="{ backgroundColor: '#FFF5E9', minHeight: '100vh', padding: '40px' }">
    <header :style="{ padding: '0 40px', marginBottom: '40px' }">
      <Logo />
    </header>
    <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }">
      <!-- Step 1 -->
      <div v-if="step === 1" :style="cardStyle">
        <div :style="{ textAlign: 'center', marginBottom: '30px' }">
          <img src="@/assets/logo.png" alt="Logo" :style="{ width: '80px', marginBottom: '20px' }" />
          <h2 :style="titleStyle">Restablece tu Contraseña</h2>
          <p :style="subTitleStyle">Ingresa tu correo y te enviaremos un código de verificación.</p>
        </div>
        
        <div :style="{ marginBottom: '25px' }">
          <label :style="labelStyle">Correo Electrónico</label>
          <input 
            type="email" 
            placeholder="tu@correo.com" 
            :style="inputStyle" 
            v-model="email"
          />
        </div>

        <button @click="step = 2" :style="buttonStyle">Enviar Código</button>

        <div :style="noteStyle">
          <strong :style="{ color: '#FF7A1A' }">Nota:</strong><br />
          El código generado tiene validez de 10 minutos.
        </div>

        <div :style="{ textAlign: 'center', marginTop: '30px' }">
          <button @click="router.push('/login')" :style="backLinkStyle">← Regresar al inicio de sesión</button>
        </div>
      </div>

      <!-- Step 2 -->
      <div v-if="step === 2" :style="cardStyle">
        <div :style="{ textAlign: 'center', marginBottom: '30px' }">
          <img src="@/assets/logo.png" alt="Logo" :style="{ width: '80px', marginBottom: '20px' }" />
          <h2 :style="titleStyle">Verificación Mango Music</h2>
          <p :style="subTitleStyle">Por favor coloca el código de verificación enviado a tu correo electrónico.</p>
        </div>

        <div :style="{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }">
          <input 
            v-for="(digit, idx) in code" 
            :key="idx"
            :id="`code-${idx}`"
            type="text"
            maxLength="1"
            v-model="code[idx]"
            @input="handleCodeInput(idx, $event)"
            :style="codeInputStyle"
          />
        </div>

        <button @click="step = 3" :style="buttonStyle">Verificar</button>

        <div :style="{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }">
          ¿No recibiste el código? <span :style="{ color: '#FF7A1A', fontWeight: '700', cursor: 'pointer' }">Reenviar código</span>
        </div>

        <div :style="{ textAlign: 'center', marginTop: '30px' }">
          <button @click="step = 1" :style="backLinkStyle">← Regresar</button>
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="step === 3" :style="cardStyle">
        <div :style="{ textAlign: 'center', marginBottom: '30px' }">
          <img src="@/assets/logo.png" alt="Logo" :style="{ width: '80px', marginBottom: '20px' }" />
          <h2 :style="titleStyle">Crear Nueva Contraseña</h2>
          <p :style="subTitleStyle">Tu nueva contraseña debe tener al menos 8 caracteres.</p>
        </div>

        <form @submit.prevent="handleSavePassword" :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
          <div>
            <label :style="labelStyle">Nueva Contraseña</label>
            <input 
              :type="showPass ? 'text' : 'password'" 
              :style="inputStyle" 
              placeholder="••••••••"
              v-model="passwords.new"
            />
          </div>
          <div>
            <label :style="labelStyle">Repite la Contraseña</label>
            <input 
              :type="showPass ? 'text' : 'password'" 
              :style="inputStyle" 
              placeholder="••••••••"
              v-model="passwords.repeat"
            />
          </div>

          <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
            <input 
              type="checkbox" 
              v-model="showPass"
              :style="{ width: '18px', height: '18px', accentColor: '#FF7A1A' }"
            />
            <span :style="{ fontSize: '0.9rem', color: '#666' }">Mostrar contraseñas</span>
          </div>

          <div :style="{ marginTop: '10px' }">
            <div :style="{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#666' }">
              <span>Seguridad de la contraseña:</span>
            </div>
            <div :style="{ height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }">
              <div :style="{ width: '70%', height: '100%', background: '#FF7A1A' }"></div>
            </div>
          </div>

          <button type="submit" :style="buttonStyle">Guardar Contraseña</button>

          <div v-if="loading" :style="{ textAlign: 'center', marginTop: '20px' }">
            <div class="spinner"></div>
            <p :style="{ fontSize: '0.9rem', color: '#666' }">Guardando y redirigiendo...</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo.vue';

const router = useRouter();
const step = ref(1);
const email = ref('');
const code = reactive(['', '', '', '', '', '']);
const passwords = reactive({ new: '', repeat: '' });
const showPass = ref(false);
const loading = ref(false);

const handleCodeInput = (index, event) => {
  const value = event.target.value;
  if (value && index < 5) {
    document.getElementById(`code-${index + 1}`).focus();
  }
};

const handleSavePassword = () => {
  loading.value = true;
  setTimeout(() => {
    router.push('/login');
  }, 2000);
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '60px',
  borderRadius: '30px',
  maxWidth: '650px',
  width: '100%',
  boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
};

const titleStyle = {
  fontSize: '2.2rem',
  fontWeight: '800',
  color: '#1A1614',
  marginBottom: '10px'
};

const subTitleStyle = {
  color: '#666',
  fontSize: '1rem',
  lineHeight: '1.5'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: '500',
  color: '#666',
  marginBottom: '10px'
};

const inputStyle = {
  width: '100%',
  padding: '15px 20px',
  borderRadius: '12px',
  border: '1px solid #F0F0F0',
  backgroundColor: '#FAFAFA',
  fontSize: '1rem',
  outline: 'none'
};

const codeInputStyle = {
  width: '60px',
  height: '70px',
  borderRadius: '12px',
  border: '2px solid #FF7A1A',
  fontSize: '1.5rem',
  fontWeight: '700',
  textAlign: 'center',
  color: '#FF7A1A',
  outline: 'none'
};

const buttonStyle = {
  width: '100%',
  padding: '18px',
  backgroundColor: '#FF7A1A',
  color: '#fff',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '1.1rem',
  border: 'none',
  cursor: 'pointer',
  transition: '0.3s',
  boxShadow: '0 4px 15px rgba(255, 122, 26, 0.2)'
};

const noteStyle = {
  marginTop: '25px',
  padding: '20px',
  backgroundColor: '#FFFBF5',
  border: '1px solid #FFE6CC',
  borderRadius: '12px',
  fontSize: '0.9rem',
  color: '#666',
  lineHeight: '1.6'
};

const backLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#FF7A1A',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '1rem'
};
</script>

<style scoped>
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #FF7A1A;
  border-top-color: transparent;
  borderRadius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
