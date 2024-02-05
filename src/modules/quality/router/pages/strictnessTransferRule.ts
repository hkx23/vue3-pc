export default [
  {
    path: '/strictnessTransferRule',
    name: 'strictnessTransferRule',
    component: () => import('../../pages/strictnessTransferRule/index.vue'),
    meta: {
      title: {
        'zh-CN': '严格度转移规则',
        'en-US': 'strictnessTransferRule',
      },
      orderNo: 0,
    },
  },
];
