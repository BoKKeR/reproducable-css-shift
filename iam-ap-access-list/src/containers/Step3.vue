<script lang="ts" setup>
import { computed, ref } from 'vue';
import { array, object, string } from 'yup';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';
import Divider from '../components/Divider.vue';

import { useStepStore } from '../stores';

import type { AccessListResource } from '../types';

const stepStore = useStepStore();

const modalOpen = ref(false);
const selectedResources = ref<AccessListResource[]>(stepStore.accessList.access_list.resource);

const maxResources = 2;

const checked = computed(() => (resource: string) => selectedResources.value.some((r) => r.name === resource));
const numOfChecked = computed(() => selectedResources.value.length);
const shouldCheckboxBeDisabled = computed(
  () => (resource: string) => numOfChecked.value >= maxResources && !checked.value(resource),
);
const resourceSchema = array()
  .of(
    object({
      name: string().min(1).required('Name is required'),
      description: string(),
      owner: string(),
    }),
  )
  .min(1)
  .max(2);
const valid = computed(() => resourceSchema.isValidSync(stepStore.accessList.access_list.resource));

const resources = [
  {
    name: 'user',
    description: '',
    owner: '1234',
  },
  {
    name: 'parcel',
    description: '',
    owner: '5678',
  },
  {
    name: 'letter',
    description: '',
    owner: '91011',
  },
];

function modalActionHandler() {
  modalOpen.value = false;
}

function handler(e: Event) {
  const { value: resource, checked } = e.target as HTMLPnCheckboxElement;
  if (checked) {
    selectedResources.value.push(JSON.parse(resource) as AccessListResource);
  } else {
    selectedResources.value = selectedResources.value.filter((r) => r.name !== JSON.parse(resource).name);
  }

  stepStore.updateAccessList({
    access_list: {
      system: stepStore.accessList.access_list.system,
      resource: selectedResources.value,
      action: stepStore.accessList.access_list.action,
    },
  });
}
</script>

<template>
  <ContentCard v-model="valid">
    <template #title>3. Select resource</template>
    <template #subtitle
      >This is the resource where the permission is applicable. You can have one or two resources.</template
    >
    <template #default>
      <pn-modal :open="modalOpen">
        <div class="new-resource-modal-container">
          <div class="modal-header">
            <h1>Create new resource</h1>
          </div>
          <div class="modal-content">
            <pn-input label="Resource name" />
            <pn-input label="Owner ID" />
          </div>
          <Divider />
          <div class="modal-actions">
            <pn-button appearance="light" variant="outlined" @click="modalActionHandler"> Cancel </pn-button>
            <pn-button @click="modalActionHandler"> Create </pn-button>
          </div>
        </div>
      </pn-modal>
      <div class="content">
        <section class="resource-selection">
          <div class="checkboxes">
            <label for="tiles">{{ numOfChecked }}/{{ maxResources }} resources selected</label>
            <div class="tiles">
              <pn-checkbox
                v-for="resource in resources"
                :key="resource.name"
                :label="resource.name"
                name="resource"
                :value="JSON.stringify(resource)"
                :checkboxid="`${resource.name}-resource-selection`"
                tile
                :checked="checked(resource.name)"
                :disabled="shouldCheckboxBeDisabled(resource.name)"
                @change="handler"
              />
            </div>
          </div>
          <div class="resource-action">
            <pn-button
              appearance="light"
              variant="borderless"
              small="true"
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
              left-icon="true"
              @click="modalOpen = true"
            >
              Create new resource
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

.resource-selection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    color: $gray700;
  }
}

.tiles {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 2rem;
}

.resource-action {
  display: flex;
  justify-content: flex-start;
}

.new-resource-modal-container {
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
