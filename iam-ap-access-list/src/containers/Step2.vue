<script lang="ts" setup>
import { computed, ref } from 'vue';
import { object, string } from 'yup';

import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';
import Divider from '../components/Divider.vue';

import type { AccessListSystem } from '../types';

const stepStore = useStepStore();

const modalOpen = ref(false);

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

function modalActionHandler() {
  modalOpen.value = false;
}

const checked = computed(() => (system: string) => stepStore.accessList.access_list.system.name === system);
const systemSchema = object().shape({
  name: string().min(1).required('Name is required'),
  description: string().min(1).required('Description is required'),
  owner: string(),
});
const valid = computed(() => systemSchema.isValidSync(stepStore.accessList.access_list.system));

function handler(e: Event) {
  const system = (e.target as HTMLPnRadioButtonElement).value;
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
      The system is the place where the permission is applicable, for example in retail (Retail) or aal (Access &
      Login).
    </template>
    <template #default>
      <pn-modal :open="modalOpen">
        <div class="new-system-modal-container">
          <div class="modal-header">
            <h1>Create new system</h1>
          </div>
          <div class="modal-content">
            <pn-input label="System name" helpertext='For example "aal" for Access and Login' />
            <pn-input label="System description" helpertext='The name of the system, for example "Access and Login"' />
            <pn-input label="Owner" helpertext="User ID of the system owner" />
          </div>
          <Divider />
          <div class="modal-actions">
            <pn-button appearance="light" variant="outlined" @click="modalActionHandler"> Cancel </pn-button>
            <pn-button @click="modalActionHandler"> Create </pn-button>
          </div>
        </div>
      </pn-modal>
      <div class="content">
        <section class="system-selection">
          <div class="tiles">
            <pn-radio-button
              v-for="system in systems"
              :key="system.name"
              :label="system.name"
              name="system"
              :value="JSON.stringify(system)"
              :helpertext="system.description"
              :radioid="`${system.name}-system-selection`"
              tile
              :checked="checked(system.name)"
              @change="handler"
            />
          </div>
          <div class="system-action">
            <pn-button
              appearance="light"
              variant="borderless"
              small="true"
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
              left-icon="true"
              @click="modalOpen = true"
            >
              Create new system
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
