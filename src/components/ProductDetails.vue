<template>
  <v-container v-if="currentProduct">
    <v-card class="mx-auto my-8" elevation="16" max-width="600">
      <v-btn @click="goBack">Назад</v-btn>

      <v-card-title class="text-h6">{{ currentProduct.title }}</v-card-title>
      <v-card-text>
        <p>{{ currentProduct.description }}</p>
        <p class="mt-2 text-subtitle-1 font-weight-bold">{{ formatPrice(currentProduct.price) }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const currentProduct = computed(() => productStore.currentProduct);
const router = useRouter();

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const goBack = () => {
  router.back();
};

onUnmounted(() => {
  productStore.removeCurrentProduct();
});
</script>
