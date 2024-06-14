import { createRouter, createWebHistory } from 'vue-router';
import ProductListView from '@/views/ProductTableView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ProductListView },
    { path: '/product/:id', component: () => import('@/views/ProductView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

export default router;
