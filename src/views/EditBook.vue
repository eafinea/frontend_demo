<template>
  <div class="container mt-5">
    <h1 class="mb-4">Edit Book</h1>
    <form @submit.prevent="updateBook">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="book.title" id="title" class="form-control" placeholder="Title" required />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input v-model="book.author" id="author" class="form-control" placeholder="Author" required />
      </div>
      <div class="form-group">
        <label for="genre">Genre</label>
        <select v-model="book.genre" id="genre" class="form-control" required>
          <option disabled value="">Please select a genre</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="book.description" id="description" class="form-control" placeholder="Description"></textarea>
      </div>
      <button type="submit" class="btn btn-warning">Update Book</button>
    </form>
  </div>
</template>

<script>
import { viewBook, editBook } from '@/helpers/api';

export default {
  data() {
    return {
      book: {},
      genres: ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Romance', 'Thriller', 'Mystery']
    };
  },
  async created() {
    this.book = await viewBook(this.$route.params.id);
  },
  methods: {
    async updateBook() {
      try {
      await editBook(this.$route.params.id, this.book);
      this.flash('Book updated successfully!', 'success');
      this.$router.push('/books');
      } catch (error) {
        console.error(error);
        this.flash('An error occurred. Please try again.', 'danger');
      }

    }
  }
};
</script>
