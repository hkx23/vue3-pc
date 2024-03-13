export default [
  {
    path: '/incidentBill',
    name: 'incidentBill',
    component: () => import('../../pages/incidentBill/index.vue'),
    meta: {
      title: {
        zh_CN: '安灯单据查询报表',
        en_US: 'incidentBill',
      },
      orderNo: 0,
    },
  },
];
