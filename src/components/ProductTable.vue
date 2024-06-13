<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="products"
      :items-length="totalProducts"
      :loading="loading"
      :search="search"
      @update:options="handlePageChange"
    >
      <template v-slot:top>
        <v-text-field v-model="search" label="Search Products" @input="handleSearch"></v-text-field>
      </template>
      <template v-slot:item="{ item }">
        <tr @click="handleProductClick(item)">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ formatPrice(item.price) }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useProducts } from '@/composables/useProducts';

const search = ref('');
const productStore = useProductStore();
const {
  products,
  totalProducts,
  //   currentPage,
  //   totalPages,
  loading,
  fetchProductsFromApi,
  setPage,
  //   search,
  itemsPerPage
} = useProducts();

// todo: headers to common config
const headers = [
  { title: 'Name', value: 'title' },
  { title: 'Description', value: 'description' },
  { title: 'Price', value: 'price' }
];

const handleProductClick = (product) => {
  productStore.setCurrentProduct(product);
  // todo: open dialog
};

const handlePageChange = () => {
  fetchProductsFromApi();
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

watch(search, () => {
  fetchProductsFromApi();
});

onMounted(() => {
  fetchProductsFromApi();
});
</script>
