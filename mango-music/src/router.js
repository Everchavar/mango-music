import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './pages/LandingPage.vue';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import Dashboard from './pages/Dashboard.vue';
import Profile from './pages/Profile.vue';
import Publish from './pages/Publish.vue';
import Library from './pages/Library.vue';
import Monetization from './pages/Monetization.vue';
import Settings from './pages/Settings.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/registro', component: Register },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/dashboard', component: Dashboard },
  { path: '/perfil', component: Profile },
  { path: '/publicar', component: Publish },
  { path: '/biblioteca', component: Library },
  { path: '/monetizacion', component: Monetization },
  { path: '/configuracion', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
