<script setup lang="ts">
import { defineEmits } from "vue";

defineEmits(["create-access-list"]);
</script>

<template>
  <div>
    <template #title>Access list manager</template>
    <template #subtitle>
      The Access List Manager allows configuration of permissions for different
      user groups across new or existing systems.
    </template>
    <template #action>
      <pn-button
        icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>'
        left-icon="true"
        @click="$emit('create-access-list')"
      >
        Create access list
      </pn-button>
    </template>
    <template #search>
      <div class="search-container">
        <pn-search-field
          style="width: 100%"
          label="To search for users go to Manage user"
          placeholder="Search for access lists"
          button="icon-inline"
          button-label="Search"
        ></pn-search-field>
        <p for="access list search">
          To search for users go to <a href="/manage-user">Manage user</a>
        </p>
      </div>
    </template>
    <template #content>
      <div class="content">
        <PostboxIllustration />
        <h4>No access lists found</h4>
        <p>Create a new access list to get started.</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  p {
    color: $gray700;
    a {
      color: $blue700;
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
</style>
