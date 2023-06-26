<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['delete-book']);

function deleteBook(id) {
  emit('delete-book', id);
}
</script>

<template>
  <div :class="['book-item', { 'book-item--favourite': book.favourite }]">
    <button class="book-item__delete" @click="deleteBook(book.id)">
      <img src="./../assets/delete-button.svg" alt="Delete book" />
    </button>
    <div class="book-item__cover">
      <img :src="book.cover" :alt="book.title" />
    </div>
    <div class="book-item__info">
      <h2 class="book-item__title">{{ book.title }}</h2>
      <p class="book-item__author">{{ book.author }}</p>
      <div class="book-item__data">
        <p class="book-item__year"><strong>Year: </strong>{{ book.year }}</p>
        <p class="book-item__pages"><strong>Pages: </strong>{{ book.pages }}</p>
        <p class="book-item__genre">
          <strong>Genre: </strong
          ><span v-for="genre in book.genre" :key="genre">{{ genre + ' ' }}</span>
        </p>
        <p class="book-item__editorial"><strong>Editorial: </strong>{{ book.editorial }}</p>
        <p class="book-item__language"><strong>Language: </strong>{{ book.language }}</p>
        <p class="book-item__isbn"><strong>ISBN: </strong>{{ book.isbn }}</p>
      </div>
    </div>

    <p v-if="book.description" class="book-item__description">
      {{ book.description }}
    </p>

    <p class="book-item__personal-note">{{ book.personalNote }}</p>

    <div class="book-item__extra">
      <p class="book-item__price"><strong>Price: </strong>{{ book.price }}</p>
      <p class="book-item__stock"><strong>Stock: </strong>{{ book.stock }}</p>
      <p class="book-item__rating">{{ book.rating }}</p>
    </div>
  </div>
</template>

<style scoped>
.book-item {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  flex-wrap: wrap;
  position: relative;
}
.book-item--favourite {
  background-color: #f5f5f5;
}
.book-item__delete {
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.book-item__delete img {
  width: 20px;
}
.book-item__cover {
  width: 30%;
  height: 300px;
  overflow: hidden;
  flex: 0 0 auto;
}
.book-item__cover img {
  width: 100%;
}
.book-item__info {
  display: flex;
  width: 70%;
  flex-direction: column;
}
.book-item__title {
  font-size: 24px;
  margin: 0;
  padding: 20px;
}
.book-item__author {
  font-size: 18px;
  margin: 0;
  padding: 0 20px;
}
.book-item__data {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  border-top: 1px solid #ccc;
  margin-top: 20px;
}
.book-item__data > p {
  width: 50%;
  margin: 10px 0;
}
.book-item__description {
  font-size: 14px;
  margin: 0;
  /* background-color: #f5f5f5; */
  padding: 10px 20px;
  border-radius: 5px;
}
.book-item__personal-note {
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 10px 20px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.book-item__extra {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
}
.book-item__extra > p {
  width: 33%;
  margin: 10px 0;
}
</style>
