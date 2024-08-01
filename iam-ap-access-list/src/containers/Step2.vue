<script lang="ts" setup>
import { computed } from 'vue';
import { object, string } from 'yup';

import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';

import type { AccessListSystem } from '../types';

const stepStore = useStepStore();

const systems = [
  {
    name: 'aal',
    description: 'Access & Login',
    owner: '1234',
  },
  {
    name: 'ncp',
    description: 'Business Portal',
    owner: '5678',
  },
  {
    name: 'flexchange',
    description: 'Flexchange Portal',
    owner: '91011',
  },
  {
    name: 'retail',
    description: 'Retail Backoffice',
    owner: '121314',
  },
];

const checked = computed(
  () => (system: string) =>
    stepStore.accessList.access_list.system.name === system
);
const systemSchema = object().shape({
  name: string().min(1).required('Name is required'),
  description: string().min(1).required('Description is required'),
  owner: string(),
});
const valid = computed(() =>
  systemSchema.isValidSync(stepStore.accessList.access_list.system)
);

function handler(e: Event) {
  const system = (e.target as any).value;
  stepStore.updateAccessList({
    access_list: {
      system: JSON.parse(system) as AccessListSystem,
      resource: stepStore.accessList.access_list.resource,
      action: stepStore.accessList.access_list.action,
    },
  });
}
</script>

<template>
  <ContentCard v-model="valid">
    <template #title> 2. Select system </template>
    <template #subtitle>
      The system is the place where the permission is applicable, for example in
      retail (Retail) or aal (Access & Login).
    </template>
    <template #default>
      <div class="content">
        <section class="system-selection">
          <div class="tiles">
            <input
              type="radio"
              v-for="system in systems"
              :key="system.name"
              :label="system.name"
              name="system"
              :value="JSON.stringify(system)"
              :checked="checked(system.name)"
              @change="handler"
            />
          </div>
          <div class="system-action">
            <button>Create new system</button>
          </div>
        </section>
        <PreviewTile />
      </div>
    </template>
  </ContentCard>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
}

.system-selection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tiles {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 2rem;
}

.system-action {
  display: flex;
  justify-content: flex-start;
}

.new-system-modal-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
