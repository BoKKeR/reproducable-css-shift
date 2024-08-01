<script lang="ts" setup>
// import { computed } from 'vue';
// import { storeToRefs } from 'pinia';

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
      <pn-button
        appearance="light"
        variant="borderless"
        icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M17.793 6.207a1.12 1.12 0 0 0-1.586 0l-.293.293L17.5 8.086l.293-.293a1.12 1.12 0 0 0 0-1.586M16.086 9.5 14.5 7.914 6.464 15.95a5 5 0 0 0-.89 1.21l1.266 1.266c.442-.232.85-.531 1.21-.89zm-1.293-4.707a3.121 3.121 0 1 1 4.414 4.414L9.464 18.95A7 7 0 0 1 4.514 21H4a1 1 0 0 1-1-1v-.515a7 7 0 0 1 2.05-4.95zM11.5 20a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-6.5a1 1 0 0 1-1-1" clip-rule="evenodd"/></svg>'
        small
        left-icon
        @click="stepStore.setStep(to)"
        >Edit</pn-button
      >
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
  background-color: $gray50;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
