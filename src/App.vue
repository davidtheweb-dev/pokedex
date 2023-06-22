<script>
import axios from 'axios';

import SearchBar from './components/SearchBar.vue';
import FilterBar from './components/FilterBar.vue';
import BookList from './components/BookList.vue';
import ModalLayer from './components/ModalLayer.vue';
import BookForm from './components/BookForm.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    FilterBar,
    BookList,
    ModalLayer,
    BookForm,
  },
  data() {
    return {
      showModal: false,
      sortBy: 'title',
      orderBy: 'asc',
      favourite: false,
      searchTerm: '',
      bookList: [],
    };
  },
  computed: {
    filteredBooks() {
      let bookList = this.bookList;

      bookList = bookList.sort((a, b) => {
        if (this.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (this.sortBy === 'author') {
          return a.author.localeCompare(b.author);
        } else if (this.sortBy === 'year') {
          return a.year - b.year;
        } else if (this.sortBy === 'pages') {
          return a.pages - b.pages;
        } else if (this.sortBy === 'price') {
          return a.price - b.price;
        } else if (this.sortBy === 'stock') {
          return a.stock - b.stock;
        } else if (this.sortBy === 'rating') {
          return a.rating - b.rating;
        }
      });
      if (this.orderBy === 'desc') {
        bookList = bookList.reverse();
      }
      if (this.favourite) {
        bookList = this.bookList.filter((book) => book.favourite);
      }

      if (!this.searchTerm) {
        return bookList;
      } else {
        bookList = this.bookList.filter((book) => {
          return (
            book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            book.genre.some((item) => item.toLowerCase().includes(this.searchTerm.toLowerCase()))
          );
        });
      }
      return bookList;
    },
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      const req = await axios.get('http://localhost:3000/catalog');
      this.bookList = req.data.recipes;
    },
    async addBook(book) {
      const req = await axios.post('http://localhost:3000/book', book);
      if (req.status === 200) {
        await this.fetchBooks();
        this.toggleForm();
      }
    },
    async deleteBook(id) {
      const req = await axios({
        method: 'DELETE',
        url: `http://localhost:3000/book/`,
        data: {
          id: id,
        },
      });
      if (req.status === 200) {
        this.fetchBooks();
      }
    },
    toggleForm() {
      this.showModal = !this.showModal;
    },
    setSearchTerm(value) {
      this.searchTerm = value;
    },
    sortBooks(sortBy) {
      this.sortBy = sortBy;
    },
    orderBooks(orderBy) {
      this.orderBy = orderBy;
    },
    favouriteBooks(favourite) {
      this.favourite = favourite;
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="header__left">
      <img class="logo" src="./assets/uoc-logo.png" alt="UOC logo" />
      <h1 class="title">Book manager</h1>
    </div>
  </header>
  <SearchBar @show-form="toggleForm" @search="setSearchTerm" />
  <FilterBar @sort-items="sortBooks" @order-items="orderBooks" @favourite-items="favouriteBooks" />
  <main class="main">
    <BookList :books="filteredBooks" @delete-book="deleteBook" />
  </main>
  <ModalLayer v-if="showModal" @close-modal="toggleForm">
    <template #header>
      <h2>Add a new book</h2>
    </template>
    <template #body>
      <BookForm @add-book="addBook" />
    </template>
  </ModalLayer>
</template>

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.header__left {
  display: flex;
  align-items: center;
}
.logo {
  height: 40px;
  margin-right: 10px;
}
.title {
  font-size: 24px;
  font-weight: 400;
}
</style>
