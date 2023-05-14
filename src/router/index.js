import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'courses',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/:courseID/workflow',
    name: 'workflow',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/:courseID/assignment',
    redirect: to => {
      return { name: 'workflow' }
    }
  },
  {
    path: '/:courseID/assignment/:assignmentID',
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
