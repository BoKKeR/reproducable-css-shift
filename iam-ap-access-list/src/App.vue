<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStepStore } from './stores';

import DefaultLayout from './layouts/DefaultLayout.vue';
import CreationLayout from './layouts/CreationLayout.vue';

const stepStore = useStepStore();
const { isCreating, isFinished } = storeToRefs(stepStore);
</script>

<template>
  <DefaultLayout
    v-if="!isCreating && !isFinished"
    @create-access-list="stepStore.setIsCreating(true)"
  />
  <CreationLayout v-else-if="isCreating && !isFinished" />
</template>

<style scoped></style>
