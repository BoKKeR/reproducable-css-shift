<script lang="ts" setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useStepStore } from '../stores';
import { AVAILABLE_CONDITIONS, AVAILABLE_CONDITIONS_MAP } from '../constants';
import { Condition, RuleProperties } from '../types';

import ContentCard from '../components/ContentCard.vue';
import IDCardIcon from '../components/icons/IDCardIcon.vue';
import OmniChannelIcon from '../components/icons/OmniChannelIcon.vue';

import AzureSelector from '../components/rules/AzureSelector.vue';
import FactSelector from '../components/rules/FactSelector.vue';
import ListUsersModal from '../components/modals/ListUsersModal.vue';
import { array, object, string } from 'yup';

const stepStore = useStepStore();
const { accessList } = storeToRefs(stepStore);

const modalOpen = ref(false);

const businessRules = computed(() => {
  return (rule: RuleProperties) => {
    return Object.values(rule.conditions).flat();
  };
});
const rulesSchema = array()
  .of(
    object({
      conditions: object().shape({
        any: array().of(
          object({
            fact: string()
              .matches(/^(AZURE_GROUP|UAS_AUTHORITYLIST|USER_PROPERTY|TIME)$/)
              .required(),
            operator: string()
              .matches(/^(equal|in|contains|greaterThanInclusive)$/)
              .required(),
            value: string().required(),
          }),
        ),
        all: array().of(
          object({
            fact: string()
              .matches(/^(AZURE_GROUP|UAS_AUTHORITYLIST|USER_PROPERTY|TIME)$/)
              .required(),
            operator: string()
              .matches(/^(equal|in|contains|greaterThanInclusive)$/)
              .required(),
            value: string().required(),
          }),
        ),
      }),
    }),
  )
  .min(1);
const valid = computed(() => rulesSchema.isValidSync(stepStore.accessList.rules));

type ChangeEvent = { detail: { label: string; selected: boolean; value: string } };

function conditionChanged(changed: ChangeEvent, ruleIndex: number) {
  const newKey = changed.detail.value;
  const oldKey = Object.keys(accessList.value.rules[ruleIndex].conditions)[0];
  const value = accessList.value.rules[ruleIndex].conditions[oldKey as Condition];
  delete accessList.value.rules[ruleIndex].conditions[oldKey as Condition];
  Object.assign(accessList.value.rules[ruleIndex].conditions, { [newKey]: value });
}

function businessRuleFactChanged(changed: ChangeEvent, ruleIndex: number, conditionIndex: number) {
  const newFact = changed.detail.value;
  const rule = accessList.value.rules[ruleIndex];
  Object.assign(rule.conditions[Object.keys(rule.conditions)[0] as Condition]![conditionIndex], { fact: newFact });
}

function businessRuleValueChanged(changed: ChangeEvent, ruleIndex: number, conditionIndex: number) {
  const newValue = changed.detail.value;
  const rule = stepStore.accessList.rules[ruleIndex];
  Object.assign(rule.conditions[Object.keys(rule.conditions)[0] as Condition]![conditionIndex], { value: newValue });
}
</script>

<template>
  <ContentCard v-model="valid">
    <template #title> 5. Define the business rules </template>
    <template #subtitle>You can create a rule to assign this permission automatically to the user.</template>
    <template #default>
      <div class="content">
        <section class="explanation">
          <div class="descriptive-text">
            <IDCardIcon width="48" height="48" />
            <div class="text">
              <h4>The following rules can be used in different combinations</h4>
              <div class="abbrevations">
                <div class="abbrevation">
                  <p class="bold">Azure -</p>
                  <p>Azure group</p>
                </div>
                <div class="abbrevation">
                  <s><p class="bold">NCP UAS -</p></s>
                  <s><p>Nordic Customer Portal User Authorisation Service list</p></s>
                </div>
                <div class="abbrevation">
                  <s><p class="bold">User property -</p></s>
                  <s><p>user property, such as country or office location</p></s>
                </div>
                <div class="abbrevation">
                  <s><p class="bold">Time window -</p></s>
                  <s><p>time of the day. Example: only working hours</p></s>
                </div>
              </div>
            </div>
          </div>
          <div class="descriptive-text">
            <OmniChannelIcon width="48" height="48" />
            <div class="text">
              <h4>Business rule example</h4>
              <div class="business-rule-example">
                <p class="bold">
                  Allow access if all of the conditions are met:
                  <br />
                  Azure > pn.administration + Time window > 09:00 - 18:00
                </p>
                <p>
                  This means that the rule permits all users in the Azure group pn-administration during the time window
                  9-18.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="create-rule" v-for="(rule, ruleIndex) in accessList.rules" :key="ruleIndex">
          <header class="rule-header">
            <h3>Rule {{ ruleIndex + 1 }}</h3>
            <pn-button
              v-if="ruleIndex !== 0"
              icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>'
              appearance="light"
              variant="borderless"
              style="align-self: center; width: fit-content"
              small
              tooltip="Remove rule"
              @click="stepStore.removeRule(ruleIndex)"
            />
          </header>
          <div class="condition-selector" @selectOption="(event: ChangeEvent) => conditionChanged(event, ruleIndex)">
            <p>If</p>
            <pn-select :value="Object.keys(rule.conditions)[0]" :key="ruleIndex">
              <pn-option
                v-for="condition in AVAILABLE_CONDITIONS"
                :label="AVAILABLE_CONDITIONS_MAP[condition as keyof typeof AVAILABLE_CONDITIONS_MAP]"
                :value="condition"
              ></pn-option>
            </pn-select>
            <p>of the conditions are met</p>
          </div>
          <div class="business-rules">
            <div
              class="business-rule"
              v-for="(businessRule, businessRuleIndex) in businessRules(rule)"
              :key="businessRuleIndex"
            >
              <div class="selectors">
                <FactSelector
                  :businessRule="businessRule"
                  :businessRuleIndex="businessRuleIndex"
                  @selectOption="(event: ChangeEvent) => businessRuleFactChanged(event, ruleIndex, businessRuleIndex)"
                />
                <AzureSelector
                  :businessRule="businessRule"
                  :businessRuleIndex="businessRuleIndex"
                  v-if="businessRule.fact === 'AZURE_GROUP'"
                  @selectOption="(event: ChangeEvent) => businessRuleValueChanged(event, ruleIndex, businessRuleIndex)"
                />
                <pn-button
                  v-if="businessRuleIndex !== 0"
                  icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L12 10.586l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg>'
                  appearance="light"
                  variant="borderless"
                  style="align-self: center; width: fit-content"
                  small
                  tooltip="Remove condition"
                  @click="stepStore.removeCondition(ruleIndex, businessRuleIndex)"
                />
              </div>
              <pn-icon
                v-if="businessRules(rule).length > 1 && businessRuleIndex !== businessRules(rule).length - 1"
                icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
                color="gray900"
                style="margin-top: 2rem"
              />
            </div>
            <div class="rule-condition-actions">
              <pn-button
                icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
                appearance="light"
                variant="borderless"
                small
                left-icon
                style="width: fit-content"
                @click="stepStore.addCondition(ruleIndex)"
                >Add condition</pn-button
              >
              <pn-button
                icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
                appearance="light"
                variant="borderless"
                small
                left-icon
                style="width: fit-content"
                @click="stepStore.addRule()"
                >Add rule</pn-button
              >
              <pn-button
                icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M4.001 7a1 1 0 0 1 1-1h.009a1 1 0 0 1 0 2h-.009a1 1 0 0 1-1-1M8 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m-3.999 5a1 1 0 0 1 1-1h.009a1 1 0 1 1 0 2h-.009a1 1 0 0 1-1-1M8 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H9a1 1 0 0 1-1-1M4 16.999a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2h-.001a1 1 0 0 1-1-1M8 17a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1" clip-rule="evenodd"/></svg>'
                appearance="light"
                variant="borderless"
                small
                left-icon
                @click="modalOpen = true"
                >Show list of users</pn-button
              >
            </div>
          </div>
        </section>
      </div>
      <ListUsersModal v-model="modalOpen" @close="modalOpen = false" />
    </template>
  </ContentCard>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem 0;
  width: 100%;

  .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .explanation {
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
        gap: 1rem;
        max-width: 60rem;
      }
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .abbrevations {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .abbrevation {
    display: flex;
    gap: 0.2rem;
  }

  .business-rule-example {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .create-rule {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .rule-header {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .condition-selector {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .business-rules {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .rule-condition-actions {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: fit-content;
      }
    }

    .business-rule {
      display: flex;
      flex-direction: column;
      width: 80%;

      .selectors {
        display: flex;
        gap: 2rem;
        width: 100%;
      }
    }
  }
}

.bold {
  font-weight: 500;
}
</style>
