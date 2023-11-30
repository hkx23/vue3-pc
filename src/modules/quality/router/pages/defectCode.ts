export default [
  {
    path: '/defectCode',
    name: 'defectCode',
    component: () => import('../../pages/defectCode/index.vue'),
    meta: {
      title: {
        'zh-CN': '缺陷代码库',
        'en-US': 'defectCode',
      },
      orderNo: 0,
    },
  },
];
