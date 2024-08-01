<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useStepStore } from "./stores";

import DefaultLayout from "./layouts/DefaultLayout.vue";

const stepStore = useStepStore();
const { isCreating, isFinished } = storeToRefs(stepStore);
</script>

<template>
  <DefaultLayout
    v-if="!isCreating && !isFinished"
    @create-access-list="stepStore.setIsCreating(true)"
  />
</template>

<style scoped></style>
