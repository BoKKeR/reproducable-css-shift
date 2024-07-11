import { defineStore } from 'pinia';

const key = 'pn-ap-sidebar-open';

export const useNavStore = defineStore({
  id: 'nav',
  state: () => ({
    _sidebarOpen: JSON.parse(localStorage.getItem(key) || 'true'),
  }),
  getters: {
    sidebarOpen(state) {
      return state._sidebarOpen;
    },
  },
  actions: {
    toggleSidebar() {
      this._sidebarOpen = !this._sidebarOpen;
      localStorage.setItem(key, JSON.stringify(this._sidebarOpen));
    },
    setSidebarOpen(open: boolean) {
      this._sidebarOpen = open;
      localStorage.setItem(key, JSON.stringify(this._sidebarOpen));
    },
  },
});
