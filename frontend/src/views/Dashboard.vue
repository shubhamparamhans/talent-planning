
<template>
  <div>
    <ReviewForm @submitted="loadReviews" />
    <hr class="my-4" />
    <ReviewList :reviews="reviews" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getReviews } from '../api/reviews.js';
import ReviewForm from '../components/ReviewForm.vue';
import ReviewList from '../components/ReviewList.vue';

const reviews = ref([]);

async function loadReviews() {
  reviews.value = await getReviews();
}

onMounted(loadReviews);
</script>
