export default [
  {
    path: '/employeePieceRateWage',
    name: 'employeePieceRateWage',
    component: () => import('../../pages/employeePieceRateWage/index.vue'),
    meta: {
      title: {
        zh_CN: '员工计件报表',
        en_US: 'employeePieceRateWage',
      },
      orderNo: 0,
    },
  },
];
