<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useStepStore } from '../stores';

import Step1 from '../containers/Step1.vue';
import Step2 from '../containers/Step2.vue';
import Step3 from '../containers/Step3.vue';
import Step4 from '../containers/Step4.vue';
import Step5 from '../containers/Step5.vue';
import Step6 from '../containers/Step6.vue';

const stepStore = useStepStore();
const { currentStep } = storeToRefs(stepStore);

function backHandler() {
  stepStore.setIsCreating(false);
}
</script>

<template>
  <div class="create-layout-container">
    <button @click="backHandler">Back</button>
    <h1>Create access list</h1>
    <Step1 v-if="currentStep === 1" />
    <Step2 v-if="currentStep === 2" />
    <Step3 v-if="currentStep === 3" />
    <Step4 v-if="currentStep === 4" />
    <Step5 v-if="currentStep === 5" />
    <Step6 v-if="currentStep === 6" />
  </div>
</template>

<style lang="scss" scoped>
.create-layout-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: start;
  justify-content: center;
  width: 100%;
}

.return-modal-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
