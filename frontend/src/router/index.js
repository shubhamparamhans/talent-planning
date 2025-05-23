import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HRDashboard from '../views/HRDashboard.vue';
import ManagerDashboard from '../views/ManagerDashboard.vue';
import CareerDevelopment from '../views/CareerDevelopment.vue';
import SuccessionPlanning from '../views/SuccessionPlanning.vue';
import AdvancedAgentCapabilities from '../views/AdvancedAgentCapabilities.vue';
import AnalyticsReporting from '../views/AnalyticsReporting.vue';
import Courses from '../views/Courses.vue';
import DevelopmentPlan from '../views/DevelopmentPlan.vue';
import EmployeeSkills from '../views/EmployeeSkills.vue';
import EmployeeTraining from '../views/EmployeeTraining.vue';
import Feedback from '../views/Feedback.vue';
import Home from '../views/Home.vue';

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
  },
  {
    path: '/career-development',
    name: 'CareerDevelopment',
    component: CareerDevelopment,
    meta: { requiresAuth: true }
  },
  {
    path: '/succession-planning',
    name: 'SuccessionPlanning',
    component: SuccessionPlanning,
    meta: { requiresAuth: true }
  },
  {
    path: '/agent-capabilities',
    name: 'AdvancedAgentCapabilities',
    component: AdvancedAgentCapabilities,
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics-reporting',
    name: 'AnalyticsReporting',
    component: AnalyticsReporting,
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: { requiresAuth: true }
  },
  {
    path: '/development-plan',
    name: 'DevelopmentPlan',
    component: DevelopmentPlan,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee-skills',
    name: 'EmployeeSkills',
    component: EmployeeSkills,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee-training',
    name: 'EmployeeTraining',
    component: EmployeeTraining,
    meta: { requiresAuth: true }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: Home,
    meta: { requiresAuth: true }
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
