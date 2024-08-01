<script lang="ts" setup>
import { computed } from 'vue';
import { string } from 'yup';

import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import ShieldIcon from '../components/icons/ShieldIcon.vue';
import ToolsIcon from '../components/icons/ToolsIcon.vue';

const stepStore = useStepStore();

const descriptionSchema = string().min(1).required('Description is required');
const valid = computed(() =>
  descriptionSchema.isValidSync(stepStore.accessList.description)
);

function updateDescription(event: Event) {
  const target = event.target as HTMLTextAreaElement;

  stepStore.setAccessList({
    ...stepStore.accessList,
    description: target.value,
  });
}
</script>

<template>
  <ContentCard v-model="valid">
    <template #title> 1. Introduction & description </template>
    <template #default>
      <div class="content">
        <section class="top">
          <h3>Introduction</h3>
          <p>
            If you are setting up an access list for the first time, please read
            the information below. If you have any questions, feel free to reach
            out to the Access & Login team.
          </p>
        </section>
        <section class="center">
          <div class="descriptive-text">
            <ShieldIcon width="48" height="48" />
            <div class="text">
              <h4>What is an access list?</h4>
              <p>
                An access list is a list of rules that specifies which users or
                systems are granted or denied access to a particular object or
                system resource. The permissions you create in your access list
                will be added to the user token if the corresponding business
                rule matches.
              </p>
            </div>
          </div>
          <div class="descriptive-text">
            <ToolsIcon width="48" height="48" />
            <div class="text">
              <h4>How does it work?</h4>
              <p>
                When you receive a request in your service you can verify the
                token and check the access list property. If this permission is
                present in the access list property you can allow access to the
                service. You can add administrators who can maintain this access
                list after creating the rules. Your access list will need to be
                approved by an internal team.
              </p>
            </div>
          </div>
        </section>
        <section class="description">
          <h3>Description of the access list</h3>
          <p>Describe the purpose of the access list</p>
          <textarea
            label="Description"
            placeholder="Descriptive text..."
            rows="5"
            @input="updateDescription"
            :value="stepStore.accessList.description"
          />
        </section>
      </div>
    </template>
  </ContentCard>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;

  .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    .descriptive-text {
      display: flex;
      align-items: center;
      gap: 2rem;

      .text {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 60rem;
      }
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
