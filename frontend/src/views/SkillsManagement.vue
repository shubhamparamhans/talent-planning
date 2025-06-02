<template>
  <div class="skills-management p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Skills Management</h1>

    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Add New Skill</h2>
      <form @submit.prevent="addSkill" class="space-y-4">
        <div>
          <label for="skillName" class="block text-sm font-medium text-gray-600">Skill Name</label>
          <input
            id="skillName"
            v-model="newSkill.name"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter skill name"
          />
        </div>

        <div>
          <label for="skillCategory" class="block text-sm font-medium text-gray-600">Category</label>
          <input
            id="skillCategory"
            v-model="newSkill.category"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter skill category"
          />
        </div>

        <div>
          <label for="skillLevel" class="block text-sm font-medium text-gray-600">Proficiency Level</label>
          <select
            id="skillLevel"
            v-model="newSkill.level"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="1">1 - Beginner</option>
            <option value="2">2 - Intermediate</option>
            <option value="3">3 - Advanced</option>
            <option value="4">4 - Expert</option>
            <option value="5">5 - Master</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Skill
        </button>
      </form>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Existing Skills</h2>
      <ul class="space-y-4">
        <li
          v-for="skill in skills"
          :key="skill._id"
          class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
        >
          <div class="flex-1 grid grid-cols-3 gap-4">
            <input v-model="skill.name" class="border p-1 rounded" />
            <input v-model="skill.category" class="border p-1 rounded" />
            <select v-model="skill.level" class="border p-1 rounded">
              <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button @click="updateSkill(skill)" class="text-blue-600 hover:text-blue-800">Update</button>
            <button @click="removeSkill(skill._id)" class="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSkills, createSkill, updateSkill as apiUpdateSkill, deleteSkill as apiDeleteSkill } from '../api/skills.js';

export default {
  data() {
    return {
      newSkill: { name: '', category: '', level: 1 },
      skills: []
    };
  },
  async created() {
    await this.loadSkills();
  },
  methods: {
    async loadSkills() {
      try {
        this.skills = await getSkills();
      } catch (err) {
        console.error(err);
      }
    },
    async addSkill() {
      if (this.newSkill.name && this.newSkill.category) {
        try {
          await createSkill(this.newSkill);
          this.newSkill = { name: '', category: '', level: 1 };
          await this.loadSkills();
        } catch (err) {
          console.error(err);
        }
      }
    },
    async updateSkill(skill) {
      try {
        await apiUpdateSkill(skill._id, {
          name: skill.name,
          category: skill.category,
          level: skill.level
        });
        await this.loadSkills();
      } catch (err) {
        console.error(err);
      }
    },
    async removeSkill(skillId) {
      try {
        await apiDeleteSkill(skillId);
        await this.loadSkills();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.skills-management {
  font-family: 'Inter', sans-serif;
}
</style>
