export default [
  {
    path: '/materialRequisition',
    name: 'materialRequisition',
    component: () => import('../../pages/materialRequisition/index.vue'),
    meta: {
      title: {
        'zh-CN': '领料制单',
        'en-US': 'materialRequisition',
      },
      orderNo: 0,
    },
  },
];
