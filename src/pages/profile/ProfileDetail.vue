<template>
  <div class="profile__info">
    <div class="profile__image"><img :src="userInfo.avatar" :alt="userInfo.name" /></div>
    <div class="profile__data">
      <h2 class="profile__name">{{ userInfo.name }}</h2>
      <p class="profile__city">{{ userInfo.city }}</p>
      <p class="profile__country">{{ userInfo.country }}</p>
      <p class="profile__email">{{ userInfo.email }}</p>
      <p class="profile__phone">{{ userInfo.phone }}</p>
      <p class="profile__address">{{ userInfo.address }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { useUserStore } from '../../stores/user/UserStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

const userStore = useUserStore();
const router = useRouter();

const userInfo = reactive({
  avatar: '',
  name: '',
  city: '',
  country: '',
  email: '',
  phone: '',
  address: '',
});

const token = computed(() => {
  return userStore.getToken;
});

watch(token, () => {
  fetchUserInfo();
  if (token.value === '') {
    router.replace('/');
  }
});

onMounted(() => {
  fetchUserInfo();
});

async function fetchUserInfo() {
  const req = await axios.get('http://localhost:3000/user', {
    headers: {
      authorization: token.value,
    },
  });
  const fetchedUserData = req.data.data;
  userInfo.avatar = fetchedUserData.avatar;
  userInfo.name = fetchedUserData.name;
  userInfo.city = fetchedUserData.city;
  userInfo.country = fetchedUserData.country;
  userInfo.email = fetchedUserData.email;
  userInfo.phone = fetchedUserData.phone;
  userInfo.address = fetchedUserData.address;
}
</script>

<style scoped>
.profile__info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
.profile__image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 50px;
}
.profile__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile__data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.profile__name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}
.profile__city,
.profile__country,
.profile__email,
.profile__phone,
.profile__address {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
