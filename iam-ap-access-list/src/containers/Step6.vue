<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { array, boolean, object, string } from 'yup';

import { useStepStore } from '../stores';

import ContentCard from '../components/ContentCard.vue';
import SummaryCard from '../components/SummaryCard.vue';

import type { RuleProperties, Fact } from '../types';

import { capitalize } from '../utils';
import { AVAILABLE_FACTS_MAP } from '../constants';

const stepStore = useStepStore();
const { accessList, accessListData } = storeToRefs(stepStore);

const conditions = computed(
  () => (rule: RuleProperties) => Object.values(rule.conditions).flat()
);
const rulesSchema = array()
  .of(
    object({
      email: string().email().required('Email is required'),
      id: string().min(1).required('ID is required'),
      valid: boolean().isTrue().required('Valid is required'),
    })
  )
  .min(1);
const valid = computed(() =>
  rulesSchema.isValidSync(stepStore.accessList.admins)
);
</script>

<template>
  <ContentCard v-model="valid">
    <template #title> 6. Summary & manage permissions </template>
    <template #subtitle>Set up who can manage the access list</template>
    <template #default>
      <div class="content">
        <section class="summary-cards">
          <SummaryCard :to="2">
            <template #title>Access list</template>
            <template #default>
              <div class="summary-card-content">
                <div class="broken-down-access-list">
                  <div
                    class="col"
                    v-for="([key, value], index) in Object.entries(
                      accessList.access_list
                    )"
                    :key="index"
                  >
                    <h4>{{ capitalize(key) }}</h4>
                    <p>
                      {{
                        Array.isArray(value)
                          ? value.map((val) => val.name).join('.')
                          : value.name
                      }}
                    </p>
                  </div>
                </div>
                <div class="col full-access-list">
                  <h4>Access list</h4>
                  <p>{{ accessListData.access_list }}</p>
                </div>
              </div>
            </template>
          </SummaryCard>
          <SummaryCard :to="5">
            <template #title>Business rules</template>
            <template #default>
              <div class="summary-card-content">
                <div
                  class="rule-summary"
                  v-for="(rule, ruleIndex) in accessList.rules"
                  :key="ruleIndex"
                >
                  <h4>
                    RULE {{ ruleIndex + 1 }} - IF
                    {{ Object.keys(rule.conditions)[0].toUpperCase() }} OF THE
                    CONDITIONS ARE MET
                  </h4>
                  <div class="condition-summary">
                    <div
                      class="condition"
                      v-for="(condition, conditionIndex) in conditions(rule)"
                      :key="conditionIndex"
                    >
                      <h4>Condition {{ conditionIndex + 1 }}</h4>
                      <p>
                        {{ AVAILABLE_FACTS_MAP[condition.fact as Fact] }} >
                        {{ condition.value }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </SummaryCard>
          <SummaryCard :to="1">
            <template #title>Description</template>
            <template #default>
              <div class="summary-card-content">
                <div class="description">
                  <h4>Describe the purpose of the access list</h4>
                  <p>{{ accessList.description }}</p>
                </div>
              </div>
            </template>
          </SummaryCard>
        </section>
        <section class="admins">
          <h3>Add administrators</h3>
          <div
            class="person-search-container"
            v-for="(person, index) in accessList.admins"
            :key="index"
          >
            <button
              v-if="accessList.admins.length > 1 && index !== 0"
              style="margin-top: 2rem"
              @click="
                () =>
                  accessList.admins.splice(
                    accessList.admins.findIndex(
                      (admin) => admin.id === person.id
                    ),
                    1
                  )
              "
            >
              Remove admin
            </button>
          </div>
          <button
            @click="
              () => accessList.admins.push({ email: '', id: '', valid: false })
            "
          >
            Add email
          </button>
        </section>
      </div>
    </template>
  </ContentCard>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
}

.summary-cards {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
}

.admins {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  align-items: start;
}

.person-search-container {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.person-search {
  width: 35rem;
}

.summary-card-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.broken-down-access-list {
  display: flex;
  align-items: start;
  gap: 20rem;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h4 {
  font-weight: 300;
  color: gray;
}

p {
  font-weight: 500;
  color: gray;
}

.rule-summary {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;

  .condition-summary {
    display: flex;
    align-items: start;
    gap: 20rem;

    .condition {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}

.description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 60rem;
}
</style>
