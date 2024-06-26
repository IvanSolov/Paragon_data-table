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

    <ErrorDialog v-model:isOpen="errorDialogState.isOpen" :message="errorDialogState.message" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/models/Product/Product';
import { fetchProducts } from '@/services/apiServices/ProductApi/productService';
import { formatPrice } from '@/utils/priceFormatter';
import ErrorDialog from './ErrorDialog.vue';
import type { ProductServerType } from '@/services/apiServices/ProductApi/types';
import { tableConfings } from '@/configs/tableConfigs';

const productStore = useProductStore();
const router = useRouter();

const products = ref<Product[]>([]);
const totalProducts = ref<number>(0);
const currentPage = ref<number>(1);
const loading = ref<boolean>(false);
const searchStr = ref<string>('');
const itemsPerPageOptions = [20, 50, 100];
const itemsPerPage = ref<number>(itemsPerPageOptions[0]);

const errorDialogState = reactive({
  isOpen: false,
  message: ''
});

const headers = tableConfings.headers;

const fetchProductsFromApi = async (query = ''): Promise<void> => {
  loading.value = true;
  try {
    const { products: productList, total } = await fetchProducts({
      search: query || searchStr.value,
      page: currentPage.value || 1,
      itemsPerPage: itemsPerPage.value || itemsPerPageOptions[0]
    });

    products.value = productList?.map((product: ProductServerType) => new Product(product));
    totalProducts.value = total;
  } catch (error) {
    errorDialogState.message = 'Failed to load products. Please try again later.';
    errorDialogState.isOpen = true;
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
};

const onProductClick = (product: Product) => {
  productStore.setCurrentProduct(product);
  router.push(`/product/${product.id}`);
};

watchEffect(() => {
  fetchProductsFromApi();
});
</script>
