<script lang="ts" setup>
import { computed, ref } from 'vue';
import { array, object, string } from 'yup';

import ContentCard from '../components/ContentCard.vue';
import PreviewTile from '../components/PreviewTile.vue';

import { useStepStore } from '../stores';

import type { AccessListResource } from '../types';

const stepStore = useStepStore();

const selectedResources = ref<AccessListResource[]>(
  stepStore.accessList.access_list.resource
);

const maxResources = 2;

const checked = computed(
  () => (resource: string) =>
    selectedResources.value.some((r) => r.name === resource)
);
const numOfChecked = computed(() => selectedResources.value.length);
const shouldCheckboxBeDisabled = computed(
  () => (resource: string) =>
    numOfChecked.value >= maxResources && !checked.value(resource)
);
const resourceSchema = array()
  .of(
    object({
      name: string().min(1).required('Name is required'),
      description: string(),
      owner: string(),
    })
  )
  .min(1)
  .max(2);
const valid = computed(() =>
  resourceSchema.isValidSync(stepStore.accessList.access_list.resource)
);

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

function handler(e: Event) {
  const { value: resource, checked } = e.target as any;
  if (checked) {
    selectedResources.value.push(JSON.parse(resource) as AccessListResource);
  } else {
    selectedResources.value = selectedResources.value.filter(
      (r) => r.name !== JSON.parse(resource).name
    );
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
      >This is the resource where the permission is applicable. You can have one
      or two resources.</template
    >
    <template #default>
      <div class="content">
        <section class="resource-selection">
          <div class="checkboxes">
            <label for="tiles"
              >{{ numOfChecked }}/{{ maxResources }} resources selected</label
            >
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
            <button>Create new resource</button>
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
    color: gray;
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
