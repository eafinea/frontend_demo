<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ book.title }}</h1>
    <div class="row">
      <div class="col-md-4">
        <img :src="book.coverImageUrl" alt="Book Cover" class="img-fluid rounded" />
      </div>
      <div class="col-md-8">
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Genre:</strong> {{ book.genre }}</p>
        <p><strong>Description:</strong></p>
        <p>{{ book.description }}</p>
      </div>
    </div>
    <router-link to="/books" class="btn btn-secondary mt-4">Back to List</router-link>
  </div>
</template>

<script>
import { viewBook } from '@/helpers/api';

export default {
  data() {
    return {
      book: {}
    };
  },
  async created() {
    this.book = await viewBook(this.$route.params.id);
  }
};
</script>
