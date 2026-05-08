<template>
  <div :style="{ display: 'flex', backgroundColor: '#F8F5F2', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }">
    <Sidebar />
    
    <main :style="{ marginLeft: '260px', flex: 1, padding: '40px', paddingBottom: '120px' }">
      <div :style="monetizationContainerStyle">
        <!-- Header -->
        <div :style="{ marginBottom: '40px' }">
          <h2 :style="{ fontSize: '2.2rem', fontWeight: '900', color: '#1A1614', letterSpacing: '-0.5px' }">Monetización</h2>
          <p :style="{ color: '#A0A0A0', fontSize: '1.1rem', marginTop: '5px' }">Gestiona tus ingresos y el apoyo de tu comunidad.</p>
        </div>

        <!-- MAIN BALANCE CARD -->
        <div :style="mainBalanceCardStyle">
          <div :style="{ flex: 1 }">
            <div :style="{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }">Saldo Total Recaudado</div>
            <div :style="{ color: '#FFF', fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }">${{ totalBalance.toFixed(2) }}</div>
          </div>
          <button @click="showWithdrawModal = true" :style="withdrawButtonStyle">Retirar Fondos</button>
        </div>

        <!-- REVENUE STREAMS -->
        <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }">
          <div :style="streamCardStyle">
            <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
              <div :style="iconBoxStyle('#E5F2FF')"><Users :size="24" :style="{ color: '#007AFF' }" /></div>
              <span :style="trendBadgeStyle(true)">+12%</span>
            </div>
            <div :style="{ color: '#A0A0A0', fontSize: '0.9rem', fontWeight: '700' }">SUSCRIPCIONES DE FANS</div>
            <div :style="{ color: '#1A1614', fontSize: '2rem', fontWeight: '900' }">$850.00</div>
          </div>
          <div :style="streamCardStyle">
            <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }">
              <div :style="iconBoxStyle('#FFF0E5')"><Heart :size="24" :style="{ color: '#FF7A1A' }" /></div>
              <span :style="trendBadgeStyle(true)">+5%</span>
            </div>
            <div :style="{ color: '#A0A0A0', fontSize: '0.9rem', fontWeight: '700' }">DONACIONES</div>
            <div :style="{ color: '#1A1614', fontSize: '2rem', fontWeight: '900' }">$395.50</div>
          </div>
        </div>
      </div>
    </main>

    <!-- Withdrawal Modal (High Fidelity Restoration) -->
    <div v-if="showWithdrawModal" :style="modalOverlayStyle">
      <div :style="modalContentStyle">
        <div v-if="isProcessing" :style="processingOverlayStyle">
          <div class="loader" :style="loaderStyle"></div>
          <h4 :style="{ color: '#1A1614', fontWeight: '800', marginTop: '20px' }">Procesando...</h4>
        </div>
        <div v-else>
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }">
            <h1 :style="{ fontSize: '1.8rem', fontWeight: '800', color: '#000' }">Forma de pago</h1>
            <button @click="showWithdrawModal = false" :style="{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#BCBCBC', cursor: 'pointer' }">✕</button>
          </div>
          <!-- Amount Picker -->
          <div :style="amountSelectionCardStyle">
            <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }">
              <label :style="fieldLabelStyle">MONTO A RETIRAR</label>
              <button @click="withdrawAmount = totalBalance" :style="maxAmountButtonStyle">Retirar Todo</button>
            </div>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '15px' }">
              <span :style="{ fontSize: '2.5rem', fontWeight: '900', color: '#1A1614' }">$</span>
              <input v-model="withdrawAmount" type="number" :style="amountInputStyle" placeholder="0.00" />
            </div>
          </div>
          <!-- Card Info -->
          <div :style="paymentBoxStyle">
            <div @click="withdrawMethod = 'card'" :style="{ padding: '25px', borderBottom: '1px solid #EEE', cursor: 'pointer' }">
              <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }">
                <div :style="{ display: 'flex', alignItems: 'center', gap: '15px' }">
                  <div :style="withdrawMethod === 'card' ? radioCheckedStyle : radioUncheckedStyle"></div>
                  <span :style="{ fontSize: '1.1rem', fontWeight: '700', color: '#000' }">Tarjeta de crédito o débito</span>
                </div>
                <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                  <div v-for="logo in paymentLogos" :key="logo.alt" :style="logoBoxStyle">
                    <img :src="logo.src" :style="{ height: '14px', maxWidth: '35px', objectFit: 'contain' }" />
                  </div>
                  <Lock :size="18" :style="{ color: '#BCBCBC', marginLeft: '10px' }" />
                </div>
              </div>
              <div v-if="withdrawMethod === 'card'" :style="{ marginTop: '20px' }">
                 <div :style="{ marginBottom: '15px' }">
                  <label :style="fieldLabelStyle">Número de tarjeta</label>
                  <div :style="inputIconWrapperStyle">
                    <CreditCard :size="20" :style="{ color: '#BCBCBC' }" />
                    <input type="text" placeholder="0000 0000 0000 0000" :style="transparentInputStyle" />
                  </div>
                </div>
                <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }">
                  <div>
                    <label :style="fieldLabelStyle">Fecha (MM/AA)</label>
                    <input type="text" placeholder="MM/AA" :style="basicInputStyle" />
                  </div>
                  <div :style="{ position: 'relative' }">
                    <label :style="fieldLabelStyle">CVV</label>
                    <div :style="inputIconWrapperStyle">
                      <input type="password" placeholder="CVV" :style="transparentInputStyle" />
                      <HelpCircle :size="18" @mouseenter="showCvvTooltip = true" @mouseleave="showCvvTooltip = false" :style="{ color: '#000', cursor: 'pointer' }" />
                    </div>
                    <div v-if="showCvvTooltip" :style="tooltipBubbleStyle">
                      El código de seguridad, o CVV, se refiere a las 3 o 4 cifras adicionales que aparecen en el reverso o el anverso de tu tarjeta.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- PayPal Option -->
            <div @click="withdrawMethod = 'paypal'" :style="{ padding: '25px', cursor: 'pointer' }">
              <div :style="{ display: 'flex', alignItems: 'center', gap: '15px' }">
                <div :style="withdrawMethod === 'paypal' ? radioCheckedStyle : radioUncheckedStyle"></div>
                <span :style="{ fontSize: '1.1rem', fontWeight: '700', color: '#000' }">PayPal</span>
              </div>
              <div v-if="withdrawMethod === 'paypal'" :style="{ marginTop: '20px' }">
                <label :style="fieldLabelStyle">Correo PayPal</label>
                <div :style="inputIconWrapperStyle">
                  <Mail :size="20" :style="{ color: '#BCBCBC' }" />
                  <input type="email" placeholder="correo@ejemplo.com" :style="transparentInputStyle" />
                </div>
              </div>
            </div>
          </div>
          <button @click="confirmWithdrawal" :style="confirmWithdrawButtonStyle">Confirmar Retiro</button>
        </div>
      </div>
    </div>

    <Player />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Users, Heart, CreditCard, Lock, HelpCircle, Mail } from 'lucide-vue-next';
import Sidebar from '@/components/Sidebar.vue';
import Player from '@/components/Player.vue';

const totalBalance = ref(1245.50);
const showWithdrawModal = ref(false);
const showCvvTooltip = ref(false);
const isProcessing = ref(false);
const withdrawAmount = ref('');
const withdrawMethod = ref('card');

const paymentLogos = [
  { alt: 'Visa', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
  { alt: 'Master', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { alt: 'Amex', src: 'https://upload.wikimedia.org/wikipedia/en/3/30/American_Express_logo.svg' },
  { alt: 'Diners', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg' }
];

const confirmWithdrawal = () => {
  if (!withdrawAmount.value || withdrawAmount.value <= 0) return alert('Ingresa un monto.');
  isProcessing.value = true;
  setTimeout(() => { 
    isProcessing.value = false; totalBalance.value -= parseFloat(withdrawAmount.value); showWithdrawModal.value = false; withdrawAmount.value = ''; alert('Retiro Exitoso'); 
  }, 2000);
};

// STYLES
const monetizationContainerStyle = { backgroundColor: '#FFF', padding: '60px', borderRadius: '50px', boxShadow: '0 20px 60px rgba(0,0,0,0.02)', minHeight: '85vh' };
const mainBalanceCardStyle = { background: 'linear-gradient(135deg, #1A1614 0%, #332D2A 100%)', padding: '50px', borderRadius: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF' };
const withdrawButtonStyle = { padding: '20px 40px', backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', borderRadius: '20px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer' };
const streamCardStyle = { backgroundColor: '#FFF', padding: '35px', borderRadius: '35px', border: '1px solid #F0F0F0' };
const iconBoxStyle = (bg) => ({ width: '56px', height: '56px', backgroundColor: bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' });
const trendBadgeStyle = (pos) => ({ padding: '6px 12px', backgroundColor: pos ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)', color: pos ? '#34C759' : '#FF3B30', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' });
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000 };
const modalContentStyle = { backgroundColor: '#FFF', padding: '50px', borderRadius: '30px', width: '680px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', position: 'relative' };
const amountSelectionCardStyle = { backgroundColor: '#F9F9F9', border: '1px solid #EEE', borderRadius: '20px', padding: '25px', marginBottom: '25px' };
const maxAmountButtonStyle = { backgroundColor: '#FF7A1A', color: '#FFF', border: 'none', padding: '6px 15px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' };
const amountInputStyle = { border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '2.5rem', fontWeight: '900', color: '#1A1614', width: '100%' };
const paymentBoxStyle = { border: '1.5px solid #EEE', borderRadius: '15px', overflow: 'hidden' };
const logoBoxStyle = { width: '50px', height: '32px', border: '1px solid #E0E0E0', borderRadius: '6px', backgroundColor: '#F9F9F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' };
const fieldLabelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#A0A0A0', letterSpacing: '0.5px' };
const inputIconWrapperStyle = { display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid #BCBCBC', borderRadius: '10px', padding: '12px 15px' };
const transparentInputStyle = { border: 'none', outline: 'none', fontSize: '1rem', width: '100%', color: '#000', fontWeight: '600' };
const basicInputStyle = { width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1.5px solid #BCBCBC', fontSize: '1rem', outline: 'none', fontWeight: '600' };
const radioCheckedStyle = { width: '22px', height: '22px', borderRadius: '50%', border: '6px solid #28a745', backgroundColor: '#FFF' };
const radioUncheckedStyle = { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #BCBCBC' };
const confirmWithdrawButtonStyle = { width: '100%', padding: '20px', backgroundColor: '#1A1614', color: '#FFF', border: 'none', borderRadius: '15px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', marginTop: '20px' };
const loaderStyle = { width: '50px', height: '50px', border: '5px solid #F3F3F3', borderTop: '5px solid #FF7A1A', borderRadius: '50%', animation: 'spin 1s linear infinite' };
const tooltipBubbleStyle = { position: 'absolute', bottom: '120%', right: '0', width: '280px', backgroundColor: '#FFF', color: '#000', padding: '15px 20px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', fontSize: '0.85rem', fontWeight: '500', border: '1px solid #EEE', zIndex: 100 };
</script>

<style>
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
