<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <input v-model="username" type="text" placeholder="Username"
             class="w-full p-2 mb-4 border rounded" required />

      <input v-model="password" type="password" placeholder="Password"
             class="w-full p-2 mb-4 border rounded" required />

      <button type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
        Login
      </button>

      <p v-if="error" class="mt-4 text-red-600 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const res = await axios.post('/api/auth/login', {
          username: this.username,
          password: this.password
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        this.$emit('login-success', res.data.role);
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      }
    }
  }
};
</script>
