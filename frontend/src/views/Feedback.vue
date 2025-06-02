<template>
  <div class="feedback p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Feedback Management</h1>

    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Add New Feedback</h2>
      <form @submit.prevent="addFeedback" class="space-y-4">
        <div>
          <label for="fbReviewId" class="block text-sm font-medium text-gray-600">Review ID</label>
          <input
            id="fbReviewId"
            v-model="newFeedback.reviewId"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter review ID"
          />
        </div>

        <div>
          <label for="fbEmployeeId" class="block text-sm font-medium text-gray-600">Employee ID</label>
          <input
            id="fbEmployeeId"
            v-model="newFeedback.employeeId"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter employee ID"
          />
        </div>

        <div>
          <label for="fbType" class="block text-sm font-medium text-gray-600">Type</label>
          <select
            id="fbType"
            v-model="newFeedback.type"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="peer">Peer</option>
            <option value="manager">Manager</option>
            <option value="direct_report">Direct Report</option>
            <option value="self">Self</option>
          </select>
        </div>

        <div class="flex items-center">
          <input
            id="fbAnonymous"
            v-model="newFeedback.anonymous"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label for="fbAnonymous" class="ml-2 block text-sm text-gray-600">Anonymous</label>
        </div>

        <div>
          <label for="fbSummary" class="block text-sm font-medium text-gray-600">Summary</label>
          <textarea
            id="fbSummary"
            v-model="newFeedback.summary"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter feedback summary"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Feedback
        </button>
      </form>
    </div>

    <div class="mt-8 bg-white shadow-md rounded-lg p-4">
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Feedback for Review</h2>
      <div class="flex gap-2 mb-4">
        <input
          v-model="filterReviewId"
          type="text"
          class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter review ID to load feedback"
        />
        <button
          @click="loadFeedbackByReview"
          class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Load
        </button>
      </div>

      <ul class="space-y-4">
        <li
          v-for="fb in feedbacks"
          :key="fb._id"
          class="bg-gray-50 border border-gray-200 rounded-lg p-4"
        >
          <p><strong>Employee ID:</strong> {{ fb.employeeId }}</p>
          <p><strong>Type:</strong> {{ fb.type }}</p>
          <p><strong>Anonymous:</strong> {{ fb.anonymous }}</p>
          <p><strong>Summary:</strong> {{ fb.summary }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getFeedbackByReview, createFeedback } from '../api/feedback.js';

export default {
  data() {
    return {
      newFeedback: {
        employeeId: '',
        reviewId: '',
        type: 'peer',
        anonymous: false,
        summary: ''
      },
      filterReviewId: '',
      feedbacks: []
    };
  },
  methods: {
    async loadFeedbackByReview() {
      if (!this.filterReviewId) return;
      try {
        this.feedbacks = await getFeedbackByReview(this.filterReviewId);
      } catch (err) {
        console.error(err);
      }
    },
    async addFeedback() {
      if (!this.newFeedback.reviewId || !this.newFeedback.employeeId) return;
      try {
        await createFeedback(this.newFeedback);
        const { reviewId } = this.newFeedback;
        this.newFeedback = { employeeId: '', reviewId, type: 'peer', anonymous: false, summary: '' };
        this.filterReviewId = reviewId;
        await this.loadFeedbackByReview();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.feedback {
  font-family: 'Inter', sans-serif;
}
</style>