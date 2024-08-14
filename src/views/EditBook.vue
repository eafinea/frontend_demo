<template>
  <div class="container mt-5">
    <flash-message></flash-message> <!-- Flash message component -->
    <h1 class="mb-4">Edit Book</h1>
    <form @submit.prevent="updateBook">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="book.title" id="title" class="form-control" placeholder="Title" required />
        <span v-if="errors.title" class="text-danger">{{ errors.title }}</span> <!-- Error message for title -->
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input v-model="book.author" id="author" class="form-control" placeholder="Author" required />
        <span v-if="errors.author" class="text-danger">{{ errors.author }}</span> <!-- Error message for author -->
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="book.description" id="description" class="form-control" placeholder="Description"
          required></textarea>
        <span v-if="errors.description" class="text-danger">{{ errors.description }}</span>
        <!-- Error message for description -->
      </div>
      <div class="form-group">
        <label for="coverImageUrl">Cover Image URL</label>
        <input v-model="book.coverImageUrl" id="coverImageUrl" class="form-control" placeholder="Image URL" />
      </div>
      <div class="form-group">
        <label for="coverImageUpload">Or Upload Cover Image</label>
        <input type="file" id="coverImageUpload" class="form-control" @change="handleFileUpload" />
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { getBookById, updateBookById } from '@/helpers/api';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        description: '',
        coverImageUrl: ''
      },
      errors: {}, // Object to hold validation errors
      uploadedImage: null
    };
  },
  async created() {
    const bookId = this.$route.params.id;
    try {
      this.book = await getBookById(bookId);
    } catch (error) {
      console.error('Error fetching book details:', error);
      this.$flashMessage.error({
        message: 'Failed to load book details!',
        time: 3000
      });
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadedImage = file;
    },
    async updateBook() {
      this.errors = {}; // Clear previous errors

      // Frontend validation
      if (!this.book.title) {
        this.errors.title = 'Title is required';
      }
      if (!this.book.author) {
        this.errors.author = 'Author is required';
      }
      if (!this.book.description) {
        this.errors.description = 'Description is required';
      }

      // Stop the submission if there are validation errors
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      try {
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

        const bookId = this.$route.params.id;
        await updateBookById(bookId, this.book);
        this.$router.push('/books');
        this.$flashMessage.success({
          message: 'Book updated successfully!',
          time: 3000
        });
      } catch (error) {
        console.error('Error updating book:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.flash(error.response.data.message, 'error');
        } else {
          this.flash('Failed to update book!', 'error');
        }
      }
    }
  }
};
</script>
