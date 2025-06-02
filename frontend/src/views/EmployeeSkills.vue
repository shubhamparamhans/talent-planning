<template>
  <div class="employee-skills p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Employee Skills Management</h1>

    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Add Skill to Employee</h2>
      <form @submit.prevent="addEmployeeSkill" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Employee ID</label>
          <input
            v-model="newEmployeeSkill.employeeId"
            type="text"
            placeholder="Enter employee ID"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Skill</label>
          <select
            v-model="newEmployeeSkill.skillId"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a skill</option>
            <option v-for="skill in skills" :key="skill._id" :value="skill._id">{{ skill.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Proficiency Level</label>
          <select
            v-model.number="newEmployeeSkill.proficiencyLevel"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Certifications (comma separated)</label>
          <input
            v-model="newEmployeeSkill.certifications"
            type="text"
            placeholder="e.g. AWS Certified, PMP"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Skill
        </button>
      </form>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Employee Skills</h2>
      <div class="flex gap-2 mb-4">
        <input
          v-model="filterEmployeeId"
          type="text"
          placeholder="Enter employee ID to load skills"
          class="mt-1 block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          @click="loadEmployeeSkills"
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Load
        </button>
      </div>
      <ul class="space-y-4">
        <li
          v-for="es in employeeSkills"
          :key="es._id"
          class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
        >
          <div class="flex-1 grid grid-cols-4 gap-4">
            <div>{{ getSkillName(es.skillId) }}</div>
            <select v-model.number="es.proficiencyLevel" class="border p-1 rounded">
              <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }}</option>
            </select>
            <input v-model="es.certifications" class="border p-1 rounded" />
            <input v-model="es.lastAssessed" type="date" class="border p-1 rounded" />
          </div>
          <div class="flex gap-2">
            <button @click="updateEmployeeSkill(es)" class="text-blue-600 hover:text-blue-800">Update</button>
            <button @click="removeEmployeeSkill(es)" class="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSkills } from '../api/skills.js';
import {
  getEmployeeSkills,
  createEmployeeSkill,
  updateEmployeeSkill as apiUpdateEmployeeSkill,
  deleteEmployeeSkill
} from '../api/employeeSkills.js';

export default {
  data() {
    return {
      newEmployeeSkill: {
        employeeId: '',
        skillId: '',
        proficiencyLevel: 1,
        certifications: ''
      },
      skills: [],
      filterEmployeeId: '',
      employeeSkills: []
    };
  },
  async created() {
    try {
      this.skills = await getSkills();
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async loadEmployeeSkills() {
      if (!this.filterEmployeeId) return;
      try {
        this.employeeSkills = await getEmployeeSkills(this.filterEmployeeId);
      } catch (err) {
        console.error(err);
      }
    },
    async addEmployeeSkill() {
      const { employeeId, skillId } = this.newEmployeeSkill;
      if (employeeId && skillId) {
        try {
          await createEmployeeSkill(employeeId, {
            skillId,
            proficiencyLevel: this.newEmployeeSkill.proficiencyLevel,
            certifications: this.newEmployeeSkill.certifications
              .split(',')
              .map(s => s.trim())
          });
          this.filterEmployeeId = employeeId;
          this.newEmployeeSkill = { employeeId, skillId: '', proficiencyLevel: 1, certifications: '' };
          await this.loadEmployeeSkills();
        } catch (err) {
          console.error(err);
        }
      }
    },
    async updateEmployeeSkill(es) {
      try {
        await apiUpdateEmployeeSkill(this.filterEmployeeId, es.skillId, {
          proficiencyLevel: es.proficiencyLevel,
          certifications: es.certifications
            .split(',')
            .map(s => s.trim()),
          lastAssessed: es.lastAssessed
        });
        await this.loadEmployeeSkills();
      } catch (err) {
        console.error(err);
      }
    },
    async removeEmployeeSkill(es) {
      try {
        await deleteEmployeeSkill(this.filterEmployeeId, es.skillId);
        await this.loadEmployeeSkills();
      } catch (err) {
        console.error(err);
      }
    },
    getSkillName(skillId) {
      const skill = this.skills.find(s => s._id === skillId);
      return skill ? skill.name : skillId;
    }
  }
};
</script>

<style scoped>
.employee-skills {
  font-family: 'Inter', sans-serif;
}
</style>