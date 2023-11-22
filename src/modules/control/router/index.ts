import { createRouter, createWebHashHistory } from 'vue-router';

import { mapModuleRouterList } from '@/router';

const pageRouters = import.meta.glob('./pages/**/*.ts', { eager: true });
const pageRouterList = mapModuleRouterList(pageRouters);
const routes = [...pageRouterList];
console.log(routes);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
