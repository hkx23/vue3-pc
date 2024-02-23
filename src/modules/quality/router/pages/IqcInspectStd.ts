export default [
  {
    path: '/IqcInspectStd',
    name: 'IqcInspectStd',
    component: () => import('../../pages/IqcInspectStd/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料检验标准',
        'en-US': 'IqcInspectStd',
      },
      orderNo: 0,
    },
  },
];
