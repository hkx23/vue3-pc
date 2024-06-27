import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/flowDemo',
    name: 'flowDemo',
    component: () => import('../../pages/flow/index.vue'),
    meta: {
      title: {
        'zh-CN': '流程组件例子',
        'en-US': 'flow example',
      },
    },
  },
] as Array<RouteRecordRaw>;
