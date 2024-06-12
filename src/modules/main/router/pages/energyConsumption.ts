export default [
  {
    path: '/energyConsumption',
    name: 'energyConsumption',
    component: () => import('../../pages/energyConsumption/index.vue'),
    meta: {
      title: {
        zh_CN: '能耗数据查询报表',
        en_US: 'energyConsumption',
      },
      orderNo: 0,
    },
  },
];
