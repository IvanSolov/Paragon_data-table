import { ref } from 'vue';
import { Product } from '@/models/Product/Product';
import { fetchProducts } from '@/services/apiServices/productService';
import type { ProductServerType } from '@/types/api/product';

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const totalProducts = ref<number>(0);
  const currentPage = ref<number>(1);
  const loading = ref<boolean>(false);
  const itemsPerPage = ref<number>();

  const fetchProductsFromApi = async (search = ''): Promise<void> => {
    loading.value = true;
    try {
      const {
        products: productList,
        total,
        limit
      } = await fetchProducts({ search, page: currentPage.value, limit: itemsPerPage.value });
      products.value = productList.map((product: ProductServerType) => new Product(product));
      totalProducts.value = total;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      loading.value = false;
    }
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    products,
    totalProducts,
    // currentPage,
    // totalPages,
    itemsPerPage,
    loading,
    fetchProductsFromApi,
    setPage
  };
};
