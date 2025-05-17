import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HRDashboard from '../views/HRDashboard.vue';
import ManagerDashboard from '../views/ManagerDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) return next('/login');
      if (role === 'hr') return next('/hr');
      if (role === 'manager') return next('/manager');
      return next('/login');
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/hr',
    name: 'HRDashboard',
    component: HRDashboard,
    meta: { requiresAuth: true, role: 'hr' }
  },
  {
    path: '/manager',
    name: 'ManagerDashboard',
    component: ManagerDashboard,
    meta: { requiresAuth: true, role: 'manager' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  if (to.meta.role && role !== to.meta.role) {
    return next('/');
  }

  next();
});

export default router;
