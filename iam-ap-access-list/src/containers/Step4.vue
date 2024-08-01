<script lang="ts" setup>
import { computed } from 'vue';
import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';

import type { AccessListAction } from '../types';
import { object, string } from 'yup';

const stepStore = useStepStore();

const actions = [
  {
    name: 'delete',
    description: '',
    owner: '1234',
  },
  {
    name: 'tracking',
    description: '',
    owner: '5678',
  },
  {
    name: 'read',
    description: '',
    owner: '91011',
  },
  {
    name: 'write',
    description: '',
    owner: '121314',
  },
];

const checked = computed(
  () => (action: string) =>
    stepStore.accessList.access_list.action.name === action
);
const actionSchema = object().shape({
  name: string().min(1).required('Name is required'),
  description: string(),
  owner: string(),
});
const valid = computed(() =>
  actionSchema.isValidSync(stepStore.accessList.access_list.action)
);

function handler(e: Event) {
  const action = (e.target as any).value;
  stepStore.updateAccessList({
    access_list: {
      system: stepStore.accessList.access_list.system,
      resource: stepStore.accessList.access_list.resource,
      action: JSON.parse(action) as AccessListAction,
    },
  });
}
</script>

<template>
  <ContentCard v-model="valid">
    <template #title> 4. Select action </template>
    <template #subtitle
      >This is the action you perform on the resource if this role is present in
      the token. For example, “read”, “write” or “admin”.</template
    >
    <template #default>
      <div class="content">
        <section class="action-selection">
          <div class="tiles">
            <input
              v-for="action in actions"
              type="radio"
              :key="action.name"
              :label="action.name"
              :value="JSON.stringify(action)"
              :checked="checked(action.name)"
              @change="handler"
            />
          </div>
          <div class="action">
            <button>Create new action</button>
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

.action-selection {
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

.action {
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
