import { defineStore } from 'pinia';
import type { Product } from '@/models/Product/Product';

interface ProductState {
  currentProduct: Product | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    currentProduct: null
  }),
  getters: {
    
  },
  actions: {
    setCurrentProduct(product: Product) {
      this.currentProduct = product;
    },
    removeCurrentProduct() {
      this.currentProduct = null;
    }
  }
});
