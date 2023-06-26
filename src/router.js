import { createRouter, createWebHistory } from 'vue-router';

const PokemonList = () => import('./pages/pokemon/PokemonList.vue');
const PokemonDetail = () => import('./pages/pokemon/PokemonList.vue');
const ProfileDetail = () => import('./pages/profile/ProfileDetail.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/pokemon' },
    { path: '/pokemon', component: PokemonList },
    {
      path: '/pokemon/:id',
      component: PokemonDetail,
      props: true,
    },
    { path: '/profile', component: ProfileDetail },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
