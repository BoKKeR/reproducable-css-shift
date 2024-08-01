import { Fact, Operator } from '@/types';

export const VALID_FACT_MATCHES: Record<Fact, Operator[]> = {
  AZURE_GROUP: ['contains'],
  UAS_AUTHORITYLIST: [],
  USER_PROPERTY: ['equal'],
  TIME: ['equal', 'greaterThanInclusive'],
};
export const VALID_FACT_MATCHES_MAP = {
  contains: 'Contains',
  equal: 'Equal',
  greaterThanInclusive: 'Greater Than or Equal',
};

export const AVAILABLE_CONDITIONS = ['all', 'any'];
export const AVAILABLE_CONDITIONS_MAP = {
  all: 'All',
  any: 'Any',
};

export const AVAILABLE_FACTS = ['AZURE_GROUP', 'UAS_AUTHORITYLIST', 'USER_PROPERTY', 'TIME'];
export const AVAILABLE_FACTS_MAP = {
  AZURE_GROUP: 'Azure',
  UAS_AUTHORITYLIST: 'NCP UAS',
  USER_PROPERTY: 'User property',
  TIME: 'Time window (GMT+2)',
};
