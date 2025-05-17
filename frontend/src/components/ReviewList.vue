<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">Review Results</h2>
    <div v-for="review in reviews" :key="review._id" class="border p-2 mb-2 rounded">
      <div class="font-bold">{{ review.name }} ({{ review.period }})</div>
      <div><strong>Summary:</strong> {{ review.result?.summary }}</div>
      <div><strong>Rating:</strong> {{ review.result?.rating }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps(['reviews']);
</script>