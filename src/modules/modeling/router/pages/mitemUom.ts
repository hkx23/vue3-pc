export default [
  {
    path: '/mitemuom',
    name: 'mitemuom',
    component: () => import('../../pages/mitemuom/index.vue'),
    meta: {
      title: {
        zh_CN: '计量单位',
        en_US: 'Mitem Uom',
      },
      orderNo: 0,
    },
  },
];
