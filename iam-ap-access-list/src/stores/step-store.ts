import { defineStore } from 'pinia';

import type { AccessList, AccessListAction, AccessListBuilder, AccessListResource, AccessListSystem } from '@/types';

export const useStepStore = defineStore({
  id: 'iam-ap-access-list-step-store',
  state: () => ({
    currentStep: 1,
    totalSteps: 6,
    accessList: {
      access_list: {
        system: {
          name: '',
          description: '',
          owner: '',
        } as AccessListSystem,
        resource: [] as AccessListResource[],
        action: {
          name: '',
          description: '',
          owner: '',
        } as AccessListAction,
      },
      owner: '',
      rules: [
        {
          conditions: {
            any: [
              {
                fact: 'AZURE_GROUP',
                operator: 'contains',
                value: '',
              },
            ],
          },
        },
      ],
      admins: [{ email: '', id: '', valid: false }],
      description: '',
    } as AccessListBuilder,
    isCreating: false,
    isFinished: false,
  }),
  getters: {
    accessListData(): AccessList {
      return {
        access_list: `${this.accessList.access_list.system.name}.${
          Array.isArray(this.accessList.access_list.resource)
            ? this.accessList.access_list.resource.map((r) => r.name).join('.')
            : ''
        }.${this.accessList.access_list.action.name}`,
        owner: this.accessList.owner,
        rules: this.accessList.rules,
        admins: this.accessList.admins.map((admin) => admin.id),
        description: this.accessList.description,
      };
    },
  },
  actions: {
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    setStep(step: number) {
      this.currentStep = step;
    },
    resetAccessList() {
      this.accessList = {
        access_list: {
          system: {
            name: '',
            description: '',
            owner: '',
          },
          resource: [],
          action: {
            name: '',
            description: '',
            owner: '',
          },
        },
        owner: '',
        rules: [
          {
            conditions: {
              any: [
                {
                  fact: 'AZURE_GROUP',
                  operator: 'contains',
                  value: '',
                },
              ],
            },
          },
        ],
        admins: [{ email: '', id: '', valid: false }],
        description: '',
      };
    },
    addRule() {
      this.accessList.rules.push({
        conditions: {
          any: [
            {
              fact: 'AZURE_GROUP',
              operator: 'contains',
              value: '',
            },
          ],
        },
      });
    },
    addCondition(ruleIndex: number) {
      if (this.accessList.rules[ruleIndex].conditions.all) {
        this.accessList.rules[ruleIndex].conditions.all?.push({
          fact: 'AZURE_GROUP',
          operator: 'contains',
          value: '',
        });
      }
      if (this.accessList.rules[ruleIndex].conditions.any) {
        this.accessList.rules[ruleIndex].conditions.any?.push({
          fact: 'AZURE_GROUP',
          operator: 'contains',
          value: '',
        });
      }
    },
    removeRule(ruleIndex: number) {
      this.accessList.rules.splice(ruleIndex, 1);
    },
    removeCondition(ruleIndex: number, conditionIndex: number) {
      const conditions = this.accessList.rules[ruleIndex].conditions;
      if (conditions.all) {
        conditions.all.splice(conditionIndex, 1);
      }
      if (conditions.any) {
        conditions.any.splice(conditionIndex, 1);
      }
    },
    setAccessList(accessList: AccessListBuilder) {
      this.accessList = accessList;
    },
    updateAccessList(data: Partial<AccessListBuilder>) {
      this.accessList = { ...this.accessList, ...data };
    },
    setIsCreating(isCreating: boolean) {
      this.isCreating = isCreating;
      this.resetAccessList();
      this.setStep(1);
    },
    setIsFinished(isFinished: boolean) {
      this.isFinished = isFinished;
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['currentStep', 'totalSteps', 'accessList', 'isCreating', 'isFinished'],
  },
});
