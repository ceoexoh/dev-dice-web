import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.info('Scepter app is ready for offline use.');
  },
});
