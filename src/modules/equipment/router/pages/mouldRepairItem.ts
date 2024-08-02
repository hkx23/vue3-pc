export default [
  {
    path: '/mouldRepairItem',
    name: 'mouldRepairItem',
    component: () => import('../../pages/mouldRepairItem/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具维修项目',
        'en-US': 'mouldRepairItem',
      },
      orderNo: 0,
    },
  },
];
