import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./pages/housing/HousingList.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HousingList },
  ],
});

export default router;
