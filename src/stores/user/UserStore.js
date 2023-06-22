import { defineStore } from 'pinia';

import actions from './UserActions';
import getters from './UserGetters';

export const useUserStore = defineStore('user', {
  state: () => ({
    logged: false,
    name: '',
    token: '',
  }),
  actions,
  getters,
});
