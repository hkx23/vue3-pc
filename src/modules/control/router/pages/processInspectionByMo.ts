export default [
  {
    path: '/processInspectionByMo',
    name: 'processInspectionByMo',
    component: () => import('../../pages/processInspectionByMo/index.vue'),
    meta: {
      title: {
        'zh-CN': '工序检验按工单',
        'en-US': 'processInspectionByMo',
      },
      orderNo: 0,
    },
  },
];
