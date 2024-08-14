<template>
  <div class="container mt-5">
    <flash-message></flash-message>
    <h1 class="mb-4">Book Library</h1>

    <div class="mb-4">
      <input 
        v-model="searchQuery"
        class="form-control"
        placeholder="Search books by title, author, or genre"
      />
    </div>

    <div class="mb-4">
      <label for="filterGenre">Filter by Genre:</label>
      <select v-model="selectedGenre" id="filterGenre" class="form-control">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <router-link to="/books/new" class="btn btn-primary mb-4">Add New Book</router-link>

    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Genre</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book._id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.genre }}</td>
          <td>
            <router-link :to="'/books/show/' + book._id" class="btn btn-info btn-sm">View</router-link>
            <router-link :to="'/books/edit/' + book._id" class="btn btn-warning btn-sm ml-2">Edit</router-link>
            <button @click="deleteBook(book._id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
        <tr v-if="filteredBooks.length === 0">
          <td colspan="4" class="text-center">No books found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { viewAllBooks, deleteBook } from '@/helpers/api';

export default {
  data() {
    return {
      books: [],
      searchQuery: '',
      selectedGenre: '',
      genres: ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Romance', 'Thriller', 'Mystery'] // Same genre list as in NewBook.vue
    };
  },
  async created() {
    this.books = await viewAllBooks();
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const matchesSearch = (
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        const matchesGenre = !this.selectedGenre || book.genre === this.selectedGenre;
        return matchesSearch && matchesGenre;
      });
    }
  },
  methods: {
    async deleteBook(id) {
      try {
        await deleteBook(id);
        this.books = await viewAllBooks(); // Refresh the list after deletion
        this.flash('Book deleted successfully!', 'success');
      } catch (error) {
        this.flash('There was an error deleting the book. Please try again.', 'error');
        console.error('Error deleting book:', error);
      }
    }
  }
};
</script>
