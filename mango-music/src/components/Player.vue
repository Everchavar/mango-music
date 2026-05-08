<template>
  <div v-if="shouldShow" :style="playerContainerStyle">
    <!-- Red Progress Bar at the top -->
    <div :style="topProgressBarStyle">
      <div :style="{ width: '35%', height: '100%', backgroundColor: '#FF0000' }"></div>
    </div>

    <!-- Main Content -->
    <div :style="playerContentStyle">
      
      <!-- LEFT: Track Info, Heart & TIME (Moved here) -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: '20px', width: '450px' }">
        <div :style="playerThumbStyle">
          <img :src="currentSong.image" :style="{ width: '100%', height: '100%', borderRadius: '6px', objectFit: 'cover' }" />
        </div>
        <div :style="{ display: 'flex', flexDirection: 'column', minWidth: 0, maxWidth: '180px' }">
          <div :style="{ color: '#FFF', fontWeight: '800', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">{{ currentSong.title }}</div>
          <div :style="{ color: '#AAA', fontSize: '0.85rem', fontWeight: '600' }">{{ currentSong.artist }}</div>
        </div>
        <div :style="{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }">
          <Heart :size="22" :style="{ color: '#FFF', cursor: 'pointer' }" />
        </div>
        <!-- Time moved close to the left section -->
        <div :style="{ color: '#AAA', fontSize: '0.9rem', fontWeight: '700', marginLeft: '20px', letterSpacing: '1px' }">
          0:35 / 3:45
        </div>
      </div>

      <!-- CENTER: Playback Controls (Standalone & Centered) -->
      <div :style="{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '40px' }">
          <SkipBack :size="26" color="#FFF" :style="{ cursor: 'pointer', transition: '0.2s' }" class="player-icon" />
          <div :style="playCircleStyle">
            <Pause :size="28" fill="#000" />
          </div>
          <SkipForward :size="26" color="#FFF" :style="{ cursor: 'pointer', transition: '0.2s' }" class="player-icon" />
        </div>
      </div>

      <!-- RIGHT: Additional Controls -->
      <div :style="{ width: '300px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '25px' }">
        <Volume2 :size="22" color="#AAA" :style="{ cursor: 'pointer' }" />
        <Repeat :size="20" color="#AAA" :style="{ cursor: 'pointer' }" />
        <Shuffle :size="20" color="#AAA" :style="{ cursor: 'pointer' }" />
        <ChevronDown :size="26" color="#AAA" :style="{ cursor: 'pointer' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Heart, 
  Repeat, Shuffle, ChevronDown 
} from 'lucide-vue-next';
import { isPlaying, currentSong } from '@/playerState';

const route = useRoute();
const shouldShow = computed(() => route.path === '/dashboard' || isPlaying.value);

// STYLES
const playerContainerStyle = {
  position: 'fixed', bottom: 0, left: 0, right: 0, height: '100px', 
  backgroundColor: '#111', zIndex: 4000, display: 'flex', flexDirection: 'column',
  boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
};

const topProgressBarStyle = {
  width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.1)'
};

const playerContentStyle = {
  flex: 1, display: 'flex', alignItems: 'center', padding: '0 40px'
};

const playCircleStyle = {
  width: '52px', height: '52px', backgroundColor: '#FFF', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  transition: '0.2s'
};

const playerThumbStyle = {
  width: '55px', height: '55px', backgroundColor: '#333', borderRadius: '6px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};
</script>

<style scoped>
.player-icon:hover { opacity: 0.7; transform: scale(1.1); }
</style>
