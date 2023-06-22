<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['show-form', 'search']);

const search = ref('');
watch(search, () => {
  emit('search', search);
});
function clearSearch() {
  search.value = '';
}

function showForm() {
  emit('show-form');
}
</script>

<template>
  <div class="search-bar">
    <input v-model="search" type="text" placeholder="Search book" />
    <button type="button" class="clear" @click="clearSearch">Clear</button>
    <button type="button" class="add" @click="showForm">Add book</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
}
.search-bar button {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
}
.search-bar .clear {
  margin-right: 10px;
}
.search-bar .add {
  background-color: #4caf50;
  color: #fff;
}
</style>
