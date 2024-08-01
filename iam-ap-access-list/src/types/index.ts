import { Event } from 'json-rules-engine';

import { RequireAtLeastOne } from './generics';

export interface AccessList {
  access_list: string;
  owner: string;
  rules: RuleProperties[];
  admins: string[];
  description: string;
  waitingForApproval?: boolean;
}

export interface AccessListBuilder {
  access_list: {
    system: AccessListSystem;
    resource: AccessListResource[];
    action: AccessListAction;
  };
  owner: string;
  rules: RuleProperties[];
  admins: { email: string; id: string; valid: boolean }[];
  description: string;
  waitingForApproval?: boolean;
}

interface AccessListTeam {
  name: string;
  description: string;
  owner: string;
}
export interface AccessListSystem extends AccessListTeam {}
export interface AccessListResource extends AccessListTeam {}
export interface AccessListAction extends AccessListTeam {}

export declare interface RuleProperties {
  conditions: RequireAtLeastOne<{
    all: ConditionProperties[];
    any: ConditionProperties[];
  }>;
  event?: Event;
}

export declare interface ConditionProperties {
  fact: Fact;
  operator: Operator;
  value: Value;
  path?: string;
}

export declare type Fact = 'AZURE_GROUP' | 'UAS_AUTHORITYLIST' | 'USER_PROPERTY' | 'TIME';
export declare type Operator = 'equal' | 'in' | 'contains' | 'greaterThanInclusive';
export declare type Value = string | number | boolean | unknown[];
export declare type Condition = 'all' | 'any';
