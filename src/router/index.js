import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'courses',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: 'course_:courseID',
        name: 'course',
        component: () => import('../views/MainView.vue'),
        children: [
          {
            path: 'assignment_:assignmentID',
            name: 'assignment',
            component: () => import('../views/MainView.vue'),
            children: [
              {
                path: 'student_:studentID',
                name: 'student',
                component: () => import('../views/MainView.vue'),
                children: [
                  {
                    path: 'answer_:answerID',
                    name: 'answer',
                    component: () => import('../views/MainView.vue'),
                  },
                ]
              },
              {
                path: 'edit',
                name: 'edit_assignment',
                component: () => import('../views/MainView.vue'),
              },
            ]
          },
          {
            path: 'user_:userID',
            name: 'user',
            component: () => import('../views/MainView.vue'),
          },
          {
            path: 'students',
            name: 'students',
            component: () => import('../views/MainView.vue'),
          },
          {
            path: 'statistics',
            name: 'statistics',
            component: () => import('../views/MainView.vue'),
          },
          {
            path: 'edit',
            name: 'edit_course',
            component: () => import('../views/MainView.vue'),
          },
          {
            path: 'create_assignment',
            name: 'create_assignment',
            component: () => import('../views/MainView.vue'),
          },
        ]
      },
      {
        path: 'create_course',
        name: 'create_course',
        component: () => import('../views/MainView.vue'),
      },
    ]
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
    path: '/complete_registration',
    name: 'complete_registration',
    component: () => import('../views/EnterView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/MainView.vue')
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
