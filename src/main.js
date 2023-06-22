import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import pinia from './stores/index';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
