<template>
  <v-dialog v-model="isOpen" max-width="600">
    <v-card>
      <v-card-title class="ml-2 mt-2">Woops!</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

defineProps<{ message: string }>();
const isOpen = defineModel<boolean>('isOpen');

const closeDialog = () => {
  isOpen.value = false;
};
</script>
