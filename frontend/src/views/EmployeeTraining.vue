<template>
  <div class="employee-training p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Employee Training Management</h1>

    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Assign Training to Employee</h2>
      <form @submit.prevent="addEmployeeTraining" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Employee ID</label>
          <input
            v-model="newEmployeeTraining.employeeId"
            type="text"
            placeholder="Enter employee ID"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Course ID</label>
          <input
            v-model="newEmployeeTraining.courseId"
            type="text"
            placeholder="Enter course ID"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Status</label>
          <select
            v-model="newEmployeeTraining.status"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Assign Training
        </button>
      </form>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Employee Training</h2>
      <div class="flex gap-2 mb-4">
        <input
          v-model="filterEmployeeId"
          type="text"
          placeholder="Enter employee ID to load training"
          class="mt-1 block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          @click="loadEmployeeTraining"
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Load
        </button>
      </div>
      <ul class="space-y-4">
        <li
          v-for="et in employeeTraining"
          :key="et._id"
          class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
        >
          <div class="flex-1 grid grid-cols-5 gap-4">
            <div>{{ et.courseId }}</div>
            <select v-model="et.status" class="border p-1 rounded">
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input v-model="et.startDate" type="date" class="border p-1 rounded" />
            <input v-model="et.completionDate" type="date" class="border p-1 rounded" />
            <input v-model.number="et.score" type="number" placeholder="Score" class="border p-1 rounded" />
            <input v-model="et.feedback" placeholder="Feedback" class="border p-1 rounded" />
          </div>
          <button @click="updateEmployeeTraining(et)" class="text-blue-600 hover:text-blue-800">Update</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getEmployeeTraining,
  createEmployeeTraining,
  updateEmployeeTraining as apiUpdateEmployeeTraining
} from '../api/employeeTraining.js';

export default {
  data() {
    return {
      newEmployeeTraining: {
        employeeId: '',
        courseId: '',
        status: 'assigned'
      },
      filterEmployeeId: '',
      employeeTraining: []
    };
  },
  methods: {
    async loadEmployeeTraining() {
      if (!this.filterEmployeeId) return;
      try {
        this.employeeTraining = await getEmployeeTraining(this.filterEmployeeId);
      } catch (err) {
        console.error(err);
      }
    },
    async addEmployeeTraining() {
      const { employeeId, courseId } = this.newEmployeeTraining;
      if (employeeId && courseId) {
        try {
          await createEmployeeTraining(employeeId, this.newEmployeeTraining);
          this.filterEmployeeId = employeeId;
          this.newEmployeeTraining = { employeeId, courseId: '', status: 'assigned' };
          await this.loadEmployeeTraining();
        } catch (err) {
          console.error(err);
        }
      }
    },
    async updateEmployeeTraining(et) {
      try {
        await apiUpdateEmployeeTraining(this.filterEmployeeId, et.courseId, {
          status: et.status,
          startDate: et.startDate,
          completionDate: et.completionDate,
          score: et.score,
          feedback: et.feedback
        });
        await this.loadEmployeeTraining();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.employee-training {
  font-family: 'Inter', sans-serif;
}
</style>