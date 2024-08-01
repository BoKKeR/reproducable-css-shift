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
      <pn-button
        v-if="!isFirstStep"
        left-icon="true"
        appearance="light"
        variant="outlined"
        icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.293 12.707a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 11H16a1 1 0 1 1 0 2H7.414l4.293 4.293a1 1 0 0 1-1.414 1.414zM18.99 11H19a1 1 0 1 1 0 2h-.01a1 1 0 1 1 0-2" clip-rule="evenodd"/></svg>'
        @click="stepStore.previousStep"
        >Previous</pn-button
      >
      <pn-button
        icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M19.707 11.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L16.586 13H8a1 1 0 1 1 0-2h8.586l-4.293-4.293a1 1 0 0 1 1.414-1.414zM5.01 13H5a1 1 0 1 1 0-2h.01a1 1 0 1 1 0 2" clip-rule="evenodd"/></svg>'
        @click="onClick"
        >Continue</pn-button
      >
    </div>
  </div>
  <pn-toast
    appearance="warning"
    icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12.874 2.514a1 1 0 0 0-1.748 0l-10 18A1 1 0 0 0 2 22h20a1 1 0 0 0 .874-1.486zM12 5.06 20.3 20H3.7zm-1.375 4.936a1.38 1.38 0 1 1 2.75 0l-.292 3.509a1.087 1.087 0 0 1-2.166 0zM12 15.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" clip-rule="evenodd"/></svg>'
    closable
    temporary
    :hide="hideToast"
    style="position: absolute; bottom: 10rem; right: 50%; transform: translateX(50%)"
  >
    All fields must be filled out
  </pn-toast>
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
  border: 1px solid $gray700;
  border-radius: 8px;
}

header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: $gray700;
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
