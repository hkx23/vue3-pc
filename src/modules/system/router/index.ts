import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/person',
      name: 'person',
      component: () => import('@/modules/system/pages/person/index.vue'),
    },
  ],
});

export default router;
