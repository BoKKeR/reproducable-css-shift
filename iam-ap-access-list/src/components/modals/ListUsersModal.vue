<script lang="ts" setup>
// import { storeToRefs } from 'pinia';
// import { useStepStore } from '../../stores';

// const stepStore = useStepStore();
// const { accessList } = storeToRefs(stepStore);

defineEmits(['close']);
const modalOpen = defineModel();

// Call rest-access-list with stepStore.accessListData and retrieve users that the access list applies to

const dummyUsers = [
  {
    email: 'test-user-1@postnord.com',
  },
  {
    email: 'test-user-2@postnord.com',
  },
  {
    email: 'test-user-3@postnord.com',
  },
  {
    email: 'test-user-4@postnord.com',
  },
];
</script>

<template>
  <pn-modal :open="modalOpen" @close="$emit('close')">
    <div class="list-users-modal-container">
      <div class="modal-header">
        <h1>List of users</h1>
      </div>
      <div class="modal-content">
        <pn-table>
          <table>
            <thead>
              <tr>
                <th>
                  <div class="column-wrapper">
                    User
                    <pn-icon
                      icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/></svg>'
                      color="blue700"
                      small=""
                    ></pn-icon>
                  </div>
                </th>
                <th>
                  <div class="column-wrapper">
                    Business rule
                    <pn-icon
                      icon='<svg class="pn-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M17.78 8.625a1 1 0 0 1-1.405.156L12 5.28l-4.375 3.5a1 1 0 1 1-1.25-1.562l5-4a1 1 0 0 1 1.25 0l5 4a1 1 0 0 1 .156 1.406m0 6.75a1 1 0 0 1-.155 1.406l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1 1.25-1.562L12 18.72l4.375-3.5a1 1 0 0 1 1.406.156" clip-rule="evenodd"/></svg>'
                      color="blue700"
                      small=""
                    ></pn-icon>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="user-row" v-for="(user, index) in dummyUsers" :key="index">
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </pn-table>
      </div>
      <!-- Pagination -->
      <Divider />
      <div class="modal-actions">
        <pn-button @click="$emit('close')"> Close </pn-button>
      </div>
    </div>
  </pn-modal>
</template>

<style lang="scss" scoped>
.column-wrapper {
  display: flex;
  align-items: center;
}

.user-row {
  border-bottom: 1px solid $gray700;
}

thead {
  border-bottom: 1px solid $blue700;
}
</style>
