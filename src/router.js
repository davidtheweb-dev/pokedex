import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from './stores/user/UserStore';

const PokemonHome = () => import('./pages/pokemon/PokemonHome.vue');
const PokemonDetail = () => import('./pages/pokemon/PokemonDetail.vue');
const ProfileDetail = () => import('./pages/profile/ProfileDetail.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PokemonHome },
    {
      path: '/:id',
      component: PokemonDetail,
      props: true,
      meta: { requiresAuth: true },
    },
    { path: '/profile', component: ProfileDetail, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isLogged) {
    next('/');
  } else {
    next();
  }
});

export default router;
