export default [
  {
    path: '/samplingStd',
    name: 'samplingStd',
    component: () => import('../../pages/samplingStd/index.vue'),
    meta: {
      title: {
        'zh-CN': '企业抽样标准',
        'en-US': 'samplingStd',
      },
      orderNo: 0,
    },
  },
];
