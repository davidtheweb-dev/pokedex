<template>
  <div class="filter-bar">
    <div class="filter-bar__select">
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortBy">
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="abilities">Abilities</option>
      </select>
    </div>
    <div class="filter-bar__select">
      <label for="order">Sort by:</label>
      <select id="order" v-model="orderBy">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <div v-if="isLogged" class="filter-bar__check">
      <input id="captured" v-model="captured" type="checkbox" />
      <label for="captured">Captured</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '../stores/user/UserStore';

const emit = defineEmits(['sort-items', 'order-items', 'captured-pokemons']);

const userStore = useUserStore();

const isLogged = computed(() => {
  return userStore.isLogged;
});

const sortBy = ref('name');
watch(sortBy, () => {
  emit('sort-items', sortBy);
});

const orderBy = ref('asc');
watch(orderBy, () => {
  emit('order-items', orderBy);
});

const captured = ref(false);
watch(captured, () => {
  emit('captured-pokemons', captured);
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}
.filter-bar__select {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.filter-bar__select label {
  margin-right: 10px;
}
.filter-bar__select select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.filter-bar__check {
  display: flex;
  align-items: center;
}
.filter-bar__check input {
  margin-right: 10px;
}
.filter-bar__check label {
  cursor: pointer;
}
</style>
