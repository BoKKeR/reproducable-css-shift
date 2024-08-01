<script lang="ts" setup>
import { AVAILABLE_FACTS, AVAILABLE_FACTS_MAP } from '../../constants';

import type { PropType } from 'vue';
import type { ConditionProperties, Fact } from '../../types';

const enabledFacts: Fact[] = ['AZURE_GROUP'];

const emit = defineEmits(['selectOption']);
defineProps({
  businessRule: {
    type: Object as PropType<ConditionProperties>,
    required: true,
  },
  businessRuleIndex: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="fact-select" @selectOption="$emit('selectOption', $event)">
    <select
      label="Business rule"
      style="width: 100%"
      :value="businessRule.fact"
      :key="businessRuleIndex"
    >
      <option
        v-for="(fact, k) in AVAILABLE_FACTS"
        :disabled="!enabledFacts.includes(fact as Fact)"
        :key="k"
        :label="AVAILABLE_FACTS_MAP[fact as keyof typeof AVAILABLE_FACTS_MAP]"
        :value="fact"
      ></option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.fact-select {
  width: 45%;
}

:deep(.pn-input-text) {
  display: none;
}
</style>
