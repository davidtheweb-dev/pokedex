<template>
  <div>
    <form @submit.prevent="loginUser">
      <div class="form__form-group">
        <label for="email">Email</label>
        <input id="email" v-model="user.email" type="text" />
      </div>
      <div class="form__form-group">
        <label for="password">Password</label>
        <input id="password" v-model="user.password" type="password" />
      </div>

      <div class="form__form-group">
        <button type="submit" class="form__submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['close-modal', 'login-user']);

const user = reactive({
  email: '',
  password: '',
});

function loginUser() {
  if (user.email === '' || user.password === '') {
    alert('Please fill in the email and password');
    return;
  }
  const userToBeAdded = { ...user };
  emit('login-user', userToBeAdded);
}
</script>

<style scoped>
.form__form-group {
  width: 50%;
  margin: 0 auto 20px auto;
}
.form__form-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
}
.form__form-group input {
  width: 80%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
}
.form__form-group input:focus {
  border-color: #000;
}
.form__submit {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
  background-color: #4caf50;
  color: #fff;
}
.form__submit:hover {
  background-color: #43a047;
}
</style>
