<template>
  <v-snackbar
    v-model="toast.visible"
    :timeout="toastDelayTime"
    :text="toast.message"
    :color="toast.color"
    location="top"
    variant="tonal"
  ></v-snackbar>
  <v-container v-if="currentProduct">
    <v-card class="mx-auto my-8" elevation="16" max-width="600">
      <v-btn
        size="x-small"
        prepend-icon="mdi-arrow-left"
        variant="text"
        class="mt-3 mx-3"
        @click="goBack"
      >
        Назад
      </v-btn>
      <v-card-title class="text-h6">{{ currentProduct.title }}</v-card-title>
      <v-card-text>
        <p>{{ currentProduct.description }}</p>
        <p class="mt-2 text-subtitle-1 font-weight-bold">{{ formatPrice(currentProduct.price) }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { formatPrice } from '@/utils/priceFormatter';

const productStore = useProductStore();
const currentProduct = computed(() => productStore.currentProduct);
const router = useRouter();
const route = useRoute();
const toastDelayTime = 3000;

const toast = ref<{ visible: boolean; message: string; color: string }>({
  visible: false,
  message: '',
  color: ''
});

const loadProduct = async (id: number) => {
  try {
    if (!Number.isFinite(id)) {
      throw new Error('Product Id is not a number');
    }

    if (!productStore.currentProduct || productStore.currentProduct.id !== id) {
      await productStore.loadProductById(id);
    }
  } catch (error: any) {
    toast.value = {
      visible: true,
      message: error?.message || 'Failed to load product',
      color: 'error'
    };
    console.error('Failed to fetch product:', error);

    setTimeout(() => {
      router.push('/');
    }, toastDelayTime + 1000);
  }
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadProduct(Number(newId));
  },
  { immediate: true }
);

const goBack = () => {
  router.back();
};

onUnmounted(() => {
  productStore.removeCurrentProduct();
});
</script>
