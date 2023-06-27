<template>
  <header class="header">
    <div class="left" @click="goHomeLink">
      <img class="logo" src="./assets/uoc-logo.png" alt="UOC logo" />
      <h1 class="app-name">Pokedex</h1>
    </div>
    <div class="right">
      <button v-if="!isLogged" class="login-button" @click="toggleForm">Login</button>
      <p v-if="isLogged" class="user" @click="goProfileLink">{{ loggedName }}</p>
      <button v-if="isLogged" class="logout-button" @click="logout">Logout</button>
    </div>
  </header>
  <router-view></router-view>
  <ModalLayer v-if="showModal" :mode-small="true" @close-modal="toggleForm">
    <template #header>
      <h2>Login</h2>
    </template>
    <template #body>
      <LoginForm @login-user="login" />
    </template>
  </ModalLayer>
</template>

<script setup>
import { ref, computed } from 'vue';

import { useUserStore } from './stores/user/UserStore';
import { useRouter } from 'vue-router';

import ModalLayer from './components/ModalLayer.vue';
import LoginForm from './components/forms/LoginForm.vue';

import axios from 'axios';

const userStore = useUserStore();
const router = useRouter();

const showModal = ref(false);

function goHomeLink() {
  router.replace('/');
}

function goProfileLink() {
  router.replace('/profile');
}

const isLogged = computed(() => {
  return userStore.isLogged;
});

const loggedName = computed(() => {
  return userStore.getName;
});

function toggleForm() {
  showModal.value = !showModal.value;
}

async function login(user) {
  const req = await axios.post('http://localhost:3000/login', user);
  if (req.data.error) {
    alert(req.data.mensaje);
  } else {
    userStore.setUserData({
      logged: true,
      name: req.data.data.name,
      token: req.data.data.tokenId,
    });
    toggleForm();
  }
}

function logout() {
  userStore.setUserData({
    logged: false,
    name: '',
    token: '',
  });
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.header .right {
  display: flex;
  align-items: center;
}
.header .logo {
  max-height: 50px;
}
.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 20px;
}

.header .user {
  display: flex;
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
}
.header .login-button,
.header .logout-button {
  background: #2c3e50;
  color: #fff;
  border: 0;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}
</style>
