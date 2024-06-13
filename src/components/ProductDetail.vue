<template>
  <v-container v-if="currentProduct">
    <v-card>
      <v-card-title>{{ currentProduct.title }}</v-card-title>
      <v-card-text>
        <p>{{ currentProduct.description }}</p>
        <p>{{ formatPrice(currentProduct.price) }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { onUnmounted } from 'vue';

const productStore = useProductStore();
const currentProduct = computed(() => productStore.currentProduct);

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

onUnmounted(() => {
  productStore.removeCurrentProduct();
})
</script>
