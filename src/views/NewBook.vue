<template>
  <div class="container mt-5">
    <h1 class="mb-4">Add New Book</h1>
    <form @submit.prevent="createBook">
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
      <div class="form-group">
        <label for="coverImageUrl">Cover Image URL</label>
        <input v-model="book.coverImageUrl" id="coverImageUrl" class="form-control" placeholder="Image URL" />
      </div>
      <div class="form-group">
        <label for="coverImageUpload">Or Upload Cover Image</label>
        <input type="file" id="coverImageUpload" class="form-control" @change="handleFileUpload" />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
  </div>
</template>

<script>
import { addNewBook } from '@/helpers/api';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        description: ''
      },
      genres: ['Fiction', 'Non-Fiction', 'Fantasy', 'Science Fiction', 'Romance', 'Thriller', 'Mystery'],
      uploadedImage: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadedImage = file;
    },

    
    async createBook() {
      
      if (this.uploadedImage) {
        const formData = new FormData();
        formData.append('file', this.uploadedImage);

        const uploadResponse = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadResponse.json();

        // Update coverImageUrl with the URL of the uploaded image
        this.book.coverImageUrl = 'http://localhost:3001' + uploadData.url;
      }

      await addNewBook(this.book);
      this.flash('Book added successfully!', 'success');
      this.$router.push('/books');
    }
  }
};
</script>