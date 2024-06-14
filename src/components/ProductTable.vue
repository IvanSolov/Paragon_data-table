<template>
  <v-container>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="currentPage"
      :items-per-page-options="itemsPerPageOptions"
      :headers="headers"
      :items="products"
      :items-length="totalProducts"
      :loading="loading"
      hover
    >
      <template v-slot:top>
        <v-text-field v-model="searchStr" label="Search Products" clearable></v-text-field>
      </template>
      <template v-slot:item="{ item }">
        <tr style="cursor: pointer" @click="onProductClick(item)">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ formatPrice(item.price) }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/models/Product/Product';
import {
  fetchProducts,
  type ProductServerType
} from '@/services/apiServices/ProductApi/productService';

const productStore = useProductStore();
const router = useRouter();

const products = ref<Product[]>([]);
const totalProducts = ref<number>(0);
const currentPage = ref<number>(1);
const loading = ref<boolean>(false);
const itemsPerPage = ref<number>();
const searchStr = ref<string>('');
const itemsPerPageOptions = [20, 50, 100];

// todo: headers to common config
const headers = [
  { title: 'Name', value: 'title' },
  { title: 'Description', value: 'description' },
  { title: 'Price', value: 'price' }
];

const fetchProductsFromApi = async (query = ''): Promise<void> => {
  loading.value = true;
  try {
    const { products: productList, total } = await fetchProducts({
      search: query || searchStr.value,
      page: currentPage.value || 1,
      itemsPerPage: itemsPerPage.value || itemsPerPageOptions[0]
    });

    products.value = productList.map((product: ProductServerType) => new Product(product));
    totalProducts.value = total;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
};

const onProductClick = (product: Product) => {
  productStore.setCurrentProduct(product);
  router.push(`/product/${product.id}`);
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

watchEffect(() => {
  fetchProductsFromApi();
});
</script>
