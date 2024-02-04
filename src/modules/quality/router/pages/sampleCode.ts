export default [
  {
    path: '/sampleCode',
    name: 'sampleCode',
    component: () => import('../../pages/sampleCode/index.vue'),
    meta: {
      title: {
        'zh-CN': '样本字码表',
        'en-US': 'sampleCode',
      },
      orderNo: 0,
    },
  },
];
