<script lang="ts" setup>
import { useStepStore } from '../stores';

const stepStore = useStepStore();

defineProps({
  to: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="content-card">
    <header>
      <h4><slot name="title" /></h4>
      <button @click="stepStore.setStep(to)">Edit</button>
    </header>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.content-card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  background-color: gray;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
