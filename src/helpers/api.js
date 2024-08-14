import axios from 'axios';

const backendURL = 'https://backend-demo-1.onrender.com/books/';

export const viewAllBooks = async () => {
   try {
      const response = await axios.get(backendURL);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};

export const viewBook = async (id) => {
   try {
      const response = await axios.get(backendURL + id);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};

export const addNewBook = async (book) => {
   try {
      const response = await axios.post(backendURL, book);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};

export const editBook = async (id, book) => {
   try {
      const response = await axios.put(backendURL + id, book);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};

export const deleteBook = async (id) => {
   try {
      const response = await axios.delete(backendURL + id);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};

export const deleteAllBooks = async () => {
   try {
      const response = await axios.delete(backendURL);
      return response.data;
   } catch (err) {
      console.error(err);
   }
};
