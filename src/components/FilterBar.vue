<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['sort-items', 'order-items', 'favourite-items']);

const sortBy = ref('title');
watch(sortBy, () => {
  emit('sort-items', sortBy);
});

const orderBy = ref('asc');
watch(orderBy, () => {
  emit('order-items', orderBy);
});

const favourite = ref(false);
watch(favourite, () => {
  emit('favourite-items', favourite);
});
</script>

<template>
  <div class="filter-bar">
    <div class="filter-bar__select">
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortBy">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="year">Year</option>
        <option value="pages">Pages</option>
        <option value="genre">Genre</option>
        <option value="editorial">Editorial</option>
        <option value="language">Language</option>
        <option value="isbn">ISBN</option>
        <option value="price">Price</option>
        <option value="stock">Stock</option>
        <option value="favorite">Favorite</option>
        <option value="rating">Rating</option>
      </select>
    </div>
    <div class="filter-bar__select">
      <label for="order">Sort by:</label>
      <select id="order" v-model="orderBy">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <div class="filter-bar__check">
      <input id="favourites" v-model="favourite" type="checkbox" />
      <label for="favourites">Favourite</label>
    </div>
  </div>
</template>

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
