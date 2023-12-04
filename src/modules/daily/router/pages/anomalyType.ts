export default [
  {
    path: '/anomalyType',
    name: 'anomalyType',
    component: () => import('../../pages/anomalyType/index.vue'),
    meta: {
      title: {
        zh_CN: '异常类型',
        en_US: 'anomalyType',
      },
      orderNo: 0,
    },
  },
];
