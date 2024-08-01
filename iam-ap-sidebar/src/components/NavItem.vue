<script lang="ts" setup>
import type { PropType } from 'vue';

import { icons } from '../constants';

defineProps({
  icon: {
    type: String as PropType<keyof typeof icons>,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'black',
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:isActive', 'navigate']);
</script>

<template>
  <li
    :class="['nav-item', { active: $props.active }]"
    @click="$emit('navigate', to)"
  >
    <a>
      <span><slot /></span>
    </a>
  </li>
</template>

<style lang="scss" scoped>
.nav-item.active > a {
  background-color: lightblue;
  border-left-color: blue;
}

.nav-item > a {
  display: flex;
  height: 36px;
  gap: 10px;
  align-content: center;
  align-items: center;
  padding: 0 1rem 0 1rem;
  cursor: pointer;
  text-wrap: nowrap;

  border-left: 4px solid transparent;

  &:hover {
    background-color: lightblue;
    border-left-color: blue;
  }

  .sidebar:not(.open) & {
    span {
      visibility: hidden;
      transition: visibility 0.1s;
    }
  }

  .sidebar.open & {
    span {
      visibility: visible;
      transition: visibility 0.1s;
    }
  }
}
</style>
