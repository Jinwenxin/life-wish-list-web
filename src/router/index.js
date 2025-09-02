import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import MainLayout from '../layouts/MainLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import BucketDetail from '../views/BucketDetail.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Welcome from '../views/Welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: '/buckets',
        name: 'Buckets',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: '/buckets/:id',
        name: 'BucketDetail',
        component: BucketDetail,
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log('Navigating to:', to.name, 'Authenticated:', authStore.isAuthenticated);

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
