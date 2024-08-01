<script setup lang="ts">
import { defineEmits } from 'vue';

import ModuleLayout from './ModuleLayout.vue';

defineEmits(['create-access-list']);
</script>

<template>
  <ModuleLayout>
    <template #title>Access list manager</template>
    <template #subtitle>
      The Access List Manager allows configuration of permissions for different
      user groups across new or existing systems.
    </template>
    <template #action>
      <button class="create-button" @click="$emit('create-access-list')">
        Create access list
      </button>
    </template>
    <template #search>
      <div class="search-container">
        <input
          class="access-list-search"
          label="To search for users go to Manage user"
          placeholder="Search for access lists"
        />
        <p for="access list search">
          To search for users go to <a href="/manage-user">Manage user</a>
        </p>
      </div>
    </template>
    <template #content>
      <div class="content">
        <h4>No access lists found</h4>
        <p>Create a new access list to get started.</p>
      </div>
    </template>
  </ModuleLayout>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  p {
    color: gray;
    a {
      color: blue;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  h4 {
    font-weight: 700;
  }

  p {
    font-weight: 400;
  }
}

.create-button {
  background-color: #0070d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.3s;
  &:hover {
    background-color: #005bb5;
  }
}
</style>
