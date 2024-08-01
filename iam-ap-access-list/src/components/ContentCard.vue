<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useStepStore } from '../stores';

const valid = defineModel();

const stepStore = useStepStore();
const { currentStep, totalSteps } = storeToRefs(stepStore);

const isFirstStep = currentStep.value === 1;
const isLastStep = currentStep.value === totalSteps.value;

const hideToast = ref(true);
const actionLocation = computed(() => {
  if (isFirstStep) return 'flex-end';
  return 'space-between';
});

function onClick() {
  if (!valid.value) {
    hideToast.value = false;
    setTimeout(() => {
      hideToast.value = true;
    }, 3000);
    return;
  }

  if (isLastStep) {
    stepStore.setIsFinished(true);
    return;
  }

  stepStore.nextStep();
}
</script>

<template>
  <div class="content-card">
    <header>
      <h2><slot name="title" /></h2>
      <p><slot name="subtitle" /></p>
    </header>
    <slot></slot>
    <div
      class="actions"
      :style="{
        justifyContent: actionLocation,
      }"
    >
      <button v-if="!isFirstStep" @click="stepStore.previousStep">
        Previous
      </button>
      <button @click="onClick">Continue</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-card {
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 2rem;
  align-items: start;
  justify-content: center;
  width: 100%;
  border: 1px solid gray;
  border-radius: 8px;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: gray;
  }
}

.actions {
  display: flex;
  width: 100%;
}

:deep(.button-tooltip) {
  content: 'All fields must be filled out before continuing';
}
</style>
