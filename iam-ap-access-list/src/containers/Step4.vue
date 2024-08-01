<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';
import Divider from '../components/Divider.vue';

import type { AccessListAction } from '../types';
import { object, string } from 'yup';

const stepStore = useStepStore();

const modalOpen = ref(false);

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

function modalActionHandler() {
  modalOpen.value = false;
}

const checked = computed(() => (action: string) => stepStore.accessList.access_list.action.name === action);
const actionSchema = object().shape({
  name: string().min(1).required('Name is required'),
  description: string(),
  owner: string(),
});
const valid = computed(() => actionSchema.isValidSync(stepStore.accessList.access_list.action));

function handler(e: Event) {
  const action = (e.target as HTMLPnRadioButtonElement).value;
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
      >This is the action you perform on the resource if this role is present in the token. For example, “read”, “write”
      or “admin”.</template
    >
    <template #default>
      <pn-modal :open="modalOpen">
        <div class="new-action-modal-container">
          <div class="modal-header">
            <h1>Create new action</h1>
          </div>
          <div class="modal-content">
            <pn-input label="Action name" />
            <pn-input label="Owner" />
          </div>
          <Divider />
          <div class="modal-actions">
            <pn-button appearance="light" variant="outlined" @click="modalActionHandler"> Cancel </pn-button>
            <pn-button @click="modalActionHandler"> Create </pn-button>
          </div>
        </div>
      </pn-modal>
      <div class="content">
        <section class="action-selection">
          <div class="tiles">
            <pn-radio-button
              v-for="action in actions"
              :key="action.name"
              :label="action.name"
              name="action"
              :value="JSON.stringify(action)"
              :helpertext="action.description"
              :radioid="`${action.name}-action-selection`"
              tile
              :checked="checked(action.name)"
              @change="handler"
            />
          </div>
          <div class="action">
            <pn-button
              appearance="light"
              variant="borderless"
              small="true"
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
              left-icon="true"
              @click="modalOpen = true"
            >
              Create new action
            </pn-button>
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
