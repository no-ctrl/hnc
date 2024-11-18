import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import './styles.css';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
