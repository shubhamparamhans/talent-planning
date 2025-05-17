<template>
  <form @submit.prevent="submit" class="space-y-4 bg-white p-4 shadow rounded">
    <div class="grid grid-cols-2 gap-4">
      <input v-model="form.name" placeholder="Name" required class="border p-2 rounded" />
      <input v-model="form.employee_id" placeholder="Employee ID" required class="border p-2 rounded" />
      <input v-model="form.role" placeholder="Role" required class="border p-2 rounded" />
      <input v-model="form.period" placeholder="Period (e.g. Q1 2025)" required class="border p-2 rounded" />
    </div>

    <textarea v-model="form.comments" placeholder="Optional Summary..." class="w-full border p-2 rounded"></textarea>

    <div>
      <h3 class="font-semibold mb-2">KPI</h3>
      <div class="space-y-2">
        <div v-for="(k, i) in form.kpis" :key="i" class="flex gap-2">
          <input v-model="k.name" placeholder="KPI Name" class="border p-1 flex-1 rounded" />
          <input type="number" v-model.number="k.score" placeholder="Score" class="border p-1 w-24 rounded" />
          <input type="number" v-model.number="k.target" placeholder="Target" class="border p-1 w-24 rounded" />
        </div>
        <button type="button" class="text-sm text-blue-600" @click="form.kpis.push({ name: '', score: 0, target: 0 })">+ Add KPI</button>
      </div>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Milestones</h3>
      <div class="space-y-2">
        <div v-for="(m, i) in form.milestones" :key="i" class="grid grid-cols-3 gap-2">
          <input v-model="m.title" placeholder="Title" class="border p-1 rounded" />
          <input type="date" v-model="m.achieved_on" class="border p-1 rounded" />
          <input v-model="m.description" placeholder="Description" class="border p-1 rounded" />
        </div>
        <button type="button" class="text-sm text-blue-600" @click="form.milestones.push({ title: '', achieved_on: '', description: '' })">+ Add Milestone</button>
      </div>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Feedback</h3>
      <div class="space-y-2">
        <div v-for="(f, i) in form.feedback" :key="i" class="grid grid-cols-4 gap-2">
          <input v-model="f.from_person" placeholder="From" class="border p-1 rounded" />
          <input v-model="f.relationship" placeholder="Relation" class="border p-1 rounded" />
          <input v-model="f.sentiment" placeholder="Sentiment" class="border p-1 rounded" />
          <input v-model="f.comment" placeholder="Comment" class="border p-1 rounded" />
        </div>
        <button type="button" class="text-sm text-blue-600" @click="form.feedback.push({ from_person: '', relationship: '', comment: '', sentiment: '' })">+ Add Feedback</button>
      </div>
    </div>

    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Submit Review</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import { postReview } from '../api/reviews.js';

const emit = defineEmits(['submitted']);

const form = reactive({
  name: '',
  employee_id: '',
  role: '',
  period: '',
  comments: '',
  kpis: [{ name: '', score: 0, target: 0 }],
  milestones: [{ title: '', achieved_on: '', description: '' }],
  feedback: [{ from_person: '', relationship: '', comment: '', sentiment: '' }]
});

async function submit() {
  const res = await postReview(form);
  if (res?.result) emit('submitted');
}
</script>