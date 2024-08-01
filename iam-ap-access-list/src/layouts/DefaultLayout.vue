<script setup lang="ts">
import { defineEmits } from 'vue';

defineEmits(['create-access-list']);
</script>

<template>
  <div class="container">
    <div class="top">
      <header>
        <div class="text">
          <h1>Access list manager</h1>
          <h2>
            The Access List Manager allows configuration of permissions for
            different user groups across new or existing systems.
          </h2>
        </div>
        <button
          class="create-access-list-button"
          @click="$emit('create-access-list')"
        >
          Create access list
        </button>
      </header>
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
    </div>
    <div class="content">
      <h4>No access lists found</h4>
      <p>Create a new access list to get started.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

header {
  display: flex;
  gap: 2rem;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-weight: 700;
    font-size: 2rem;
  }

  h2 {
    font-weight: 400;
    font-size: 1rem;
  }

  .create-access-list-button {
    background-color: blue;
    color: gray;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
}

.text-area-search {
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid gray;
}

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
</style>
