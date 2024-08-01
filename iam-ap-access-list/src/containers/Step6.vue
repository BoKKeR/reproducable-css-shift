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

const dummyPeople = [
  {
    name: 'Philip Rutberg',
    email: 'philip.rutberg@postnord.com',
    id: '1',
  },
  {
    name: 'Norbert Takacs',
    email: 'norbert.takacs@postnord.com',
    id: '2',
  },
  {
    name: 'Fredrik Quennerstedt',
    email: 'fredrik.quennerstedt@postnord.com',
    id: '3',
  },
  {
    name: 'Vijil Girish',
    email: 'vijil.girish@postnord.com',
    id: '4',
  },
];

const conditions = computed(() => (rule: RuleProperties) => Object.values(rule.conditions).flat());
type Person = { email: string; id: string; valid: boolean };
const getIsValid = computed(() => (person: Person) => {
  return person.valid && person.id !== '' && person.email !== '' ? true : undefined;
});
const getIsInvalid = computed(() => (person: Person) => {
  return !person.valid && person.id === '' && person.email !== '' ? true : undefined;
});
const getError = computed(() => (person: Person) => {
  return getIsInvalid.value(person) ? 'Email could not be found in Azure' : undefined;
});
const getHelperText = computed(() => (person: Person) => {
  return getIsValid.value(person) ? 'Email found in Azure' : 'Email must be available in Azure';
});
const rulesSchema = array()
  .of(
    object({
      email: string().email().required('Email is required'),
      id: string().min(1).required('ID is required'),
      valid: boolean().isTrue().required('Valid is required'),
    }),
  )
  .min(1);
const valid = computed(() => rulesSchema.isValidSync(stepStore.accessList.admins));

function debounceSearch(input: string, delay: number) {
  let timeoutId: number | undefined;

  return (callback: (input: string) => void) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(input);
    }, delay);
  };
}

const debouncedSearch = debounceSearch('', 300);

function searchPerson(input: string, index: number) {
  debouncedSearch(() => {
    const person = accessList.value.admins[index];
    if (!person) return;

    const foundPerson = dummyPeople.find((dummyPerson) => dummyPerson.email === input);
    if (foundPerson) {
      person.email = foundPerson.email;
      person.id = foundPerson.id;
      person.valid = true;
    } else {
      person.email = input;
      person.id = '';
      person.valid = false;
    }
  });
}
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
                  <div class="col" v-for="([key, value], index) in Object.entries(accessList.access_list)" :key="index">
                    <h4>{{ capitalize(key) }}</h4>
                    <p>{{ Array.isArray(value) ? value.map((val) => val.name).join('.') : value.name }}</p>
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
                <div class="rule-summary" v-for="(rule, ruleIndex) in accessList.rules" :key="ruleIndex">
                  <h4>
                    RULE {{ ruleIndex + 1 }} - IF {{ Object.keys(rule.conditions)[0].toUpperCase() }} OF THE CONDITIONS
                    ARE MET
                  </h4>
                  <div class="condition-summary">
                    <div
                      class="condition"
                      v-for="(condition, conditionIndex) in conditions(rule)"
                      :key="conditionIndex"
                    >
                      <h4>Condition {{ conditionIndex + 1 }}</h4>
                      <p>{{ AVAILABLE_FACTS_MAP[condition.fact as Fact] }} > {{ condition.value }}</p>
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
          <div class="person-search-container" v-for="(person, index) in accessList.admins" :key="index">
            <pn-input
              style="width: 35rem"
              label="Email"
              :helpertext="getHelperText(person)"
              :valid="getIsValid(person)"
              :error="getError(person)"
              :value="person.email"
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm.793 1.793a1 1 0 0 1 1.414 0L12 12.586l4.793-4.793a1 1 0 1 1 1.414 1.414L15.414 12l1.793 1.793a1 1 0 0 1-1.414 1.414L14 13.414l-1.293 1.293a1 1 0 0 1-1.414 0L10 13.414l-1.793 1.793a1 1 0 0 1-1.414-1.414L8.586 12 5.793 9.207a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>'
              @input="searchPerson($event.target.value, index)"
            />
            <pn-button
              v-if="accessList.admins.length > 1 && index !== 0"
              appearance="light"
              variant="borderless"
              small
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>'
              tooltip="Remove admin"
              style="margin-top: 2rem"
              @click="
                () =>
                  accessList.admins.splice(
                    accessList.admins.findIndex((admin) => admin.id === person.id),
                    1,
                  )
              "
            />
          </div>
          <pn-button
            appearance="light"
            variant="borderless"
            icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
            small
            left-icon
            @click="() => accessList.admins.push({ email: '', id: '', valid: false })"
            >Add email</pn-button
          >
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
  color: $gray700;
}

p {
  font-weight: 500;
  color: $gray900;
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
