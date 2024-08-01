<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useStepStore } from '../stores';

import KeyIcon from '../components/icons/KeyIcon.vue';

const stepStore = useStepStore();
const { accessList, currentStep } = storeToRefs(stepStore);

const getClass = computed(() => (step: number) => currentStep.value >= step ? 'previewing' : 'not-previewing');
</script>

<template>
  <div class="preview">
    <label for="preview">Access list preview</label>
    <div class="tile">
      <KeyIcon />
      <div class="preview-access-list">
        <span :class="getClass(2)">{{ accessList.access_list.system.name || 'system' }}</span>
        <span :class="getClass(3)">.</span>
        <span :class="getClass(3)">{{
          accessList.access_list.resource?.map((r) => r.name)?.join('.') || 'resource'
        }}</span>
        <span :class="getClass(4)">.</span>
        <span :class="getClass(4)">{{ accessList.access_list.action.name || 'action' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: $gray700;
}

.tile {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 8px;
  background-color: $gray50;
  width: max-content;
}

.preview-access-list {
  display: flex;
  gap: 0;
}

.previewing {
  color: $gray900;
}

.not-previewing {
  color: $gray200;
}
</style>
