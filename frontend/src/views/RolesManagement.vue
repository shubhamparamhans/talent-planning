<template>
  <div class="roles-management p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Roles Management</h1>

    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Add New Role</h2>
      <form @submit.prevent="addRole" class="space-y-4">
        <div>
          <label for="roleTitle" class="block text-sm font-medium text-gray-600">Title</label>
          <input
            id="roleTitle"
            v-model="newRole.title"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter role title"
          />
        </div>

        <div>
          <label for="roleDepartment" class="block text-sm font-medium text-gray-600">Department</label>
          <input
            id="roleDepartment"
            v-model="newRole.department"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter department"
          />
        </div>

        <div>
          <label for="roleLevel" class="block text-sm font-medium text-gray-600">Level</label>
          <input
            id="roleLevel"
            v-model.number="newRole.level"
            type="number"
            min="1"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="roleDescription" class="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            id="roleDescription"
            v-model="newRole.description"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter description"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Role
        </button>
      </form>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Existing Roles</h2>
      <ul class="space-y-4">
        <li v-for="role in roles" :key="role._id" class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div class="flex-1 grid grid-cols-4 gap-4">
            <input v-model="role.title" class="border p-1 rounded" />
            <input v-model="role.department" class="border p-1 rounded" />
            <input v-model.number="role.level" type="number" class="border p-1 rounded" />
            <input v-model="role.description" class="border p-1 rounded" />
          </div>
          <div class="flex gap-2">
            <button @click="updateRole(role)" class="text-blue-600 hover:text-blue-800">Update</button>
            <button @click="removeRole(role._id)" class="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getRoles,
  createRole,
  updateRole as apiUpdateRole,
  deleteRole as apiDeleteRole
} from '../api/roles.js';

export default {
  data() {
    return {
      newRole: { title: '', department: '', level: 1, description: '' },
      roles: []
    };
  },
  async created() {
    await this.loadRoles();
  },
  methods: {
    async loadRoles() {
      try {
        this.roles = await getRoles();
      } catch (err) {
        console.error(err);
      }
    },
    async addRole() {
      if (this.newRole.title && this.newRole.department) {
        try {
          await createRole(this.newRole);
          this.newRole = { title: '', department: '', level: 1, description: '' };
          await this.loadRoles();
        } catch (err) {
          console.error(err);
        }
      }
    },
    async updateRole(role) {
      try {
        await apiUpdateRole(role._id, {
          title: role.title,
          department: role.department,
          level: role.level,
          description: role.description
        });
        await this.loadRoles();
      } catch (err) {
        console.error(err);
      }
    },
    async removeRole(roleId) {
      try {
        await apiDeleteRole(roleId);
        await this.loadRoles();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.roles-management {
  font-family: 'Inter', sans-serif;
}
</style>