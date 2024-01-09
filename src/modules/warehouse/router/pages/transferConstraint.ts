export default [
  {
    path: '/transferConstraint',
    name: 'transferConstraint',
    component: () => import('../../pages/transferConstraint/index.vue'),
    meta: {
      title: {
        'zh-CN': '仓库转移规则',
        'en-US': 'transferConstraint',
      },
      orderNo: 0,
    },
  },
];
