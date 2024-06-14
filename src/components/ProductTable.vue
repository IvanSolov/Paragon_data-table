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

    <v-dialog v-model="errorDialogState.isOpen" max-width="600">
      <v-card>
        <v-card-title class="ml-2 mt-2">Woops!</v-card-title>
        <v-card-text>{{ errorDialogState.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click="errorDialogState.isOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { Product } from '@/models/Product/Product';
import {
  fetchProducts,
  type ProductServerType
} from '@/services/apiServices/ProductApi/productService';
import { formatPrice } from '@/utils/priceFormatter';

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
