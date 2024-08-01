<script lang="ts" setup></script>

<template>
  <div class="module-layout">
    <div class="header">
      <div class="info">
        <h1>
          <slot name="title" />
        </h1>
        <p>
          <slot name="subtitle" />
        </p>
      </div>
      <div class="action">
        <slot name="action" />
      </div>
    </div>
    <div class="search">
      <slot name="search" />
    </div>
    <div class="module-layout-content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.module-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 5rem;

  h1 {
    font-size: 2rem;
  }
  p {
    color: gray;
  }

  .header {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    align-items: center;

    .info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .search {
    width: 100%;
  }

  .action {
    min-width: max-content;
  }

  .module-layout-content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
