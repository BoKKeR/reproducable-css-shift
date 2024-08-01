<script lang="ts" setup>
defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="divider"
    :style="{
      height: vertical ? '100%' : '1px',
      width: vertical ? '1px' : '100%',
    }"
  />
</template>

<style lang="scss" scoped>
.divider {
  background-color: lightgray;
}
</style>
