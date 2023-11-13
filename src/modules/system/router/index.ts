import { createRouter, createWebHashHistory } from 'vue-router';

// const routes = [
//   {
//     path: '/user',
//     name: 'user',
//     component: () => import('@/modules/system/pages/user/index.vue'),
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('@/modules/system/pages/user/index.vue'),
    },
  ],
});

export default router;
