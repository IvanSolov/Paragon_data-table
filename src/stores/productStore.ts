import { defineStore } from 'pinia';
import { Product } from '@/models/Product/Product';
import { fetchProductById } from '@/services/apiServices/ProductApi/productService';

type ProductState = {
  currentProduct: Product | null;
  loading: boolean;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    currentProduct: null,
    loading: false
  }),
  actions: {
    setCurrentProduct(product: Product) {
      this.currentProduct = product;
    },
    removeCurrentProduct() {
      this.currentProduct = null;
    },
    async loadProductById(id: number) {
      this.loading = true;

      try {
        const productData = await fetchProductById(id);
        this.currentProduct = new Product(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
