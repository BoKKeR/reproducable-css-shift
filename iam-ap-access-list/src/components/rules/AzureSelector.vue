<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

import type { PropType } from 'vue';
import type { ConditionProperties } from '../../types';

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

const dummyGroups = computed(() =>
  Array.from({ length: 10000 }, (_, i) => ({
    id: String(i + 1),
    name: `Group ${i + 1}`,
    description: `Group ${i + 1} description`,
  })),
);
const totalLength = computed(() => dummyGroups.value.length);
const filteredLength = computed(() => filteredGroups.value.length);

const filteredGroups = ref<{ id: string; name: string; description: string }[]>([]);
const helperText = ref(`Showing ${filteredLength.value} of ${totalLength.value} groups`);
const search = ref('');

watchEffect(() => {
  filteredGroups.value = dummyGroups.value
    .filter((group) => group.name.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 100);

  helperText.value = `Showing ${filteredLength.value} of ${totalLength.value} groups`;
});
</script>

<template>
  <div class="azure-group-select" @selectOption="$emit('selectOption', $event)">
    <pn-select
      label="Azure group"
      search
      search-id="groups-search"
      style="width: 100%"
      :helpertext="helperText"
      :value="businessRule.value"
      :key="businessRuleIndex"
      @input="search = $event.target.value"
    >
      <pn-option v-for="group in filteredGroups" :key="group.id" :label="group.name" :value="group.id"></pn-option>
    </pn-select>
  </div>
</template>

<style lang="scss" scoped>
.azure-group-select {
  width: 45%;
}

:deep(.pn-input-text) {
  display: none;
}
</style>
