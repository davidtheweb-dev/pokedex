<script setup>
import { uuid } from 'vue-uuid';
import { reactive } from 'vue';

const emit = defineEmits(['close-modal', 'add-book']);

const book = reactive({
  title: '',
  author: '',
  description: '',
  year: '',
  pages: '',
  genre: '',
  editorial: '',
  language: '',
  isbn: '',
  price: '',
  stock: '',
  favourite: false,
  rating: '',
  cover: '',
});

function resetBook() {
  book.title = '';
  book.author = '';
  book.description = '';
  book.year = '';
  book.pages = '';
  book.genre = '';
  book.editorial = '';
  book.language = '';
  book.isbn = '';
  book.stock = '';
  book.favourite = false;
  book.rating = '';
  book.cover = '';
}

function createBook() {
  if ((book.title === '' || book.author === '', book.description === '')) {
    alert('Please fill in the title and author fields');
    return;
  }
  book.id = uuid.v4();
  book.genre = book.genre.split(',');
  const bookToBeAdded = { ...book };
  emit('add-book', bookToBeAdded);
  resetBook();
}
</script>

<template>
  <div class="book-form">
    <form class="book-form__form" @submit.prevent="createBook">
      <div class="book-form__form-group">
        <label for="title">Title</label>
        <input id="title" v-model="book.title" type="text" />
      </div>
      <div class="book-form__form-group">
        <label for="author">Author</label>
        <input id="author" v-model="book.author" type="text" />
      </div>
      <div class="book-form__form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="book.description"></textarea>
      </div>
      <div class="book-form__form-group">
        <label for="year">Year</label>
        <input id="year" v-model="book.year" type="number" />
      </div>
      <div class="book-form__form-group">
        <label for="pages">Pages</label>
        <input id="pages" v-model="book.pages" type="number" />
      </div>
      <div class="book-form__form-group">
        <label for="genre">Genre</label>
        <input id="genre" v-model="book.genre" type="text" />
      </div>
      <div class="book-form__form-group">
        <label for="editorial">Editorial</label>
        <input id="editorial" v-model="book.editorial" type="text" />
      </div>
      <div class="book-form__form-group">
        <label for="language">Language</label>
        <select id="language" v-model="book.language">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
        </select>
      </div>
      <div class="book-form__form-group">
        <label for="isbn">ISBN</label>
        <input id="isbn" v-model="book.isbn" type="text" />
      </div>
      <div class="book-form__form-group">
        <label for="price">Price</label>
        <input id="price" v-model="book.price" type="number" />
      </div>
      <div class="book-form__form-group">
        <label for="stock">Stock</label>
        <input id="stock" v-model="book.stock" type="number" />
      </div>
      <div class="book-form__form-group">
        <label for="favourite">Favourite</label>
        <input id="favourite" v-model="book.favourite" type="checkbox" />
      </div>
      <div class="book-form__form-group">
        <label for="rating">Rating</label>
        <select id="rating" v-model="book.rating">
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div class="book-form__form-group">
        <label for="image">Image</label>
        <input id="image" v-model="book.cover" type="text" />
      </div>
      <div class="book-form__form-group">
        <button type="submit" class="book-form__submit">Add book</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.book-form__form {
  display: flex;
  flex-wrap: wrap;
}
.book-form__form-group {
  margin-bottom: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.book-form__form-group label {
  display: block;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
}
.book-form__form-group input,
.book-form__form-group textarea,
.book-form__form-group select {
  width: 80%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  text-align: left;
}
.book-form__form-group input:focus,
.book-form__form-group textarea:focus,
.book-form__form-group select:focus {
  border-color: #000;
}
.book-form__form-group textarea {
  height: 100px;
}
.book-form__submit {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
  background-color: #4caf50;
  color: #fff;
}
.book-form__submit:hover {
  background-color: #43a047;
}
</style>
