import Vue from 'vue';
import Router from 'vue-router';
import Books from './views/Books.vue';
import ShowBook from './views/ShowBook.vue';
import NewBook from './views/NewBook.vue';
import EditBook from './views/EditBook.vue';

Vue.use(Router);

const router = new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         redirect: '/books'
      },
      {
         path: '/books',
         name: 'Books',
         component: Books
      },
      {
         path: '/books/new',
         name: 'NewBook',
         component: NewBook
      },
      {
         path: '/books/show/:id',
         name: 'ShowBook',
         component: ShowBook
      },
      {
         path: '/books/edit/:id',
         name: 'EditBook',
         component: EditBook
      }
   ]
});

export default router;
