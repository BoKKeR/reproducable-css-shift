<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { storeToRefs } from 'pinia';
import * as singleSpa from 'single-spa';
import NavItem from './components/NavItem.vue';
import { useNavStore } from './stores/nav';
import { icons } from './constants';
import { computed } from 'vue';

const navStore = useNavStore();
const { sidebarOpen } = storeToRefs(navStore);

const sidebarRef = ref<HTMLElement>();

const currentPath = computed(() => document.location.pathname);
const isActive = ref<string>(currentPath.value);

const toggleSidebar = () => {
  navStore.toggleSidebar();
};

watchEffect(() => {
  if (!sidebarRef.value) return;

  if (sidebarOpen.value) {
    sidebarRef.value.classList.add('open');
  } else {
    sidebarRef.value.classList.remove('open');
  }
});

const handleNavigate = (url: string) => {
  isActive.value = url;
  singleSpa.navigateToUrl(url);
};

interface NavItem {
  to: string;
  icon: keyof typeof icons;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', icon: 'start', label: 'Start' },
  { to: '/access-list', icon: 'access_list', label: 'Access List' },
];
</script>

<template>
  <div
    ref="sidebarRef"
    :class="['sidebar', { open: sidebarOpen }]"
    class="flex flex-col gap-2 mt-4"
  >
    <div class="sidebar-header px-4">
      <div class="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          class="pn-icon-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          @click="toggleSidebar"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M3 7a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
            clip-rule="evenodd"
          />
        </svg>
        <p v-if="sidebarOpen">Menu</p>
      </div>
    </div>
    <div class="border-t border-gray-300"></div>
    <div class="sidebar-content">
      <nav>
        <ul class="flex flex-col">
          <NavItem
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :icon="item.icon"
            :active="isActive === item.to"
            @navigate="handleNavigate"
          >
            {{ item.label }}
          </NavItem>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar.open {
  width: 250px;
}

.sidebar {
  width: 60px;
  transition: width 0.3s;
}
</style>
