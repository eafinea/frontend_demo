<template>
  <div class="container mt-5">
    <flash-message></flash-message>
    <h1 class="mb-4">Book Library <span class="badge badge-info" style="color: #fff; background-color: #17a2b8;">Total Books: {{ sortedAndFilteredBooks.length }}</span></h1>

    <div class="mb-4">
      <input 
        v-model="searchQuery"
        class="form-control"
        placeholder="Search books by title, author, or genre"
      />
    </div>

    <div class="mb-4 row">
      <div class="col-md-6">
        <label for="filterGenre">Filter by Genre:</label>
        <select v-model="selectedGenre" id="filterGenre" class="form-control">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <div class="col-md-6">
        <label for="sortOption">Sort by:</label>
        <select v-model="sortOption" id="sortOption" class="form-control">
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="author-asc">Author (A-Z)</option>
          <option value="author-desc">Author (Z-A)</option>
          <option value="genre-asc">Genre (A-Z)</option>
          <option value="genre-desc">Genre (Z-A)</option>
        </select>
      </div>
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
        <tr v-for="book in sortedAndFilteredBooks" :key="book._id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.genre }}</td>
          <td>
            <router-link :to="'/books/show/' + book._id" class="btn btn-info btn-sm">View</router-link>
            <router-link :to="'/books/edit/' + book._id" class="btn btn-warning btn-sm ml-2">Edit</router-link>
            <button @click="deleteBook(book._id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
        <tr v-if="sortedAndFilteredBooks.length === 0">
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
      sortOption: 'title-asc', // Default sorting option
      genres: ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Romance', 'Thriller', 'Mystery'],
    };
  },
  async created() {
    this.books = await viewAllBooks();
  },
  computed: {
    sortedAndFilteredBooks() {
      // Filter books first based on search and genre
      let filteredBooks = this.books.filter(book => {
        const matchesSearch = (
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        const matchesGenre = !this.selectedGenre || book.genre === this.selectedGenre;
        return matchesSearch && matchesGenre;
      });

      // Sort the filtered books
      return filteredBooks.sort((a, b) => {
        const [key, order] = this.sortOption.split('-');
        let result = a[key].localeCompare(b[key]);
        return order === 'asc' ? result : -result;
      });
    }
  },
  methods: {
    async deleteBook(bookId) {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteBook(bookId);
          this.books = await viewAllBooks();
          this.flash('Book deleted successfully!', 'success');
        } catch (error) {
          console.error(error);
          this.flash('An error occurred. Please try again.', 'danger');
        }
      }
    }
  }
};
</script>
