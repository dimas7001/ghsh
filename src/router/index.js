import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/workflow',
    name: 'workflow',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/assignment',
    redirect: to => {
      return { path: '/workflow' }
    }
  },
  {
    path: '/assignment/:id',
    name: 'assignment',
    component: () => import('../views/EnterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/EnterView.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/EnterView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
