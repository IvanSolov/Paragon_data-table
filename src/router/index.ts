import { createRouter, createWebHistory } from 'vue-router';
import ProductListView from '@/views/ProductTableView.vue';
import ProductDetailView from '@/views/ProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ProductListView },
    { path: '/product/:id', component: ProductDetailView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

export default router;
