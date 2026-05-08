<template>
  <div :style="{ backgroundColor: '#FFF5E9', minHeight: '100vh', color: '#1A1614', fontFamily: 'Poppins, sans-serif' }">
    <!-- Navigation -->
    <nav :style="{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 80px',
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }">
      <Logo size="medium" />
      <div :style="{ display: 'flex', gap: '40px', fontWeight: '500' }">
        <router-link to="/" :style="{ color: '#FF7A1A', textDecoration: 'none' }">Inicio</router-link>
        <router-link to="/eventos" :style="{ color: '#666', textDecoration: 'none' }">Eventos</router-link>
        <router-link to="/sobre-nosotros" :style="{ color: '#666', textDecoration: 'none' }">Sobre Nosotros</router-link>
      </div>
      <router-link to="/registro" :style="{ 
        backgroundColor: '#FF7A1A', 
        color: '#fff', 
        padding: '12px 30px', 
        borderRadius: '8px', 
        textDecoration: 'none',
        fontWeight: '600'
      }">
        Registrarse
      </router-link>
    </nav>

    <!-- Hero Section -->
    <div :style="{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '100px 80px',
      maxWidth: '1400px',
      margin: '0 auto'
    }">
      <div :style="{ maxWidth: '600px' }">
        <h1 :style="{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }">
          Tu música, <br />
          <span :style="{ color: '#FF7A1A' }">Tu Comunidad.</span>
        </h1>
        <p :style="{ fontSize: '1.2rem', color: '#666', marginBottom: '40px', lineHeight: '1.6' }">
          La plataforma para artistas independientes <br />
          que quieren compartir su música con el mundo.
        </p>
        <div>
          <router-link to="/registro" :style="{ 
            backgroundColor: '#FF7A1A', 
            color: '#fff', 
            padding: '18px 40px', 
            borderRadius: '12px', 
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            display: 'inline-block',
            boxShadow: '0 10px 20px rgba(255, 122, 26, 0.3)'
          }">
            Registrarte Gratis
          </router-link>
        </div>

        <!-- Stats -->
        <div :style="{ display: 'flex', gap: '60px', marginTop: '80px' }">
          <div>
            <div :style="{ fontSize: '2.5rem', fontWeight: '800', color: '#FF7A1A' }">+0</div>
            <div :style="{ color: '#666', fontSize: '1rem' }">Artistas</div>
          </div>
          <div>
            <div :style="{ fontSize: '2.5rem', fontWeight: '800', color: '#FF7A1A' }">0K+</div>
            <div :style="{ color: '#666', fontSize: '1rem' }">Canciones</div>
          </div>
          <div>
            <div :style="{ fontSize: '2.5rem', fontWeight: '800', color: '#FF7A1A' }">0K+</div>
            <div :style="{ color: '#666', fontSize: '1rem' }">Oyentes</div>
          </div>
        </div>
      </div>

      <div :style="{ width: '500px' }">
        <img 
          src="@/assets/logo.png" 
          alt="Mango Music" 
          :style="{ width: '100%', height: 'auto' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
</script>
