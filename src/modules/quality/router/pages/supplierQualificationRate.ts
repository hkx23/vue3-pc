export default [
  {
    path: '/supplierQualificationRate',
    name: 'supplierQualificationRate',
    component: () => import('../../pages/supplierQualificationRate/index.vue'),
    meta: {
      title: {
        'zh-CN': '供应商合格率报表',
        'en-US': 'supplierQualificationRate',
      },
      orderNo: 0,
    },
  },
];
