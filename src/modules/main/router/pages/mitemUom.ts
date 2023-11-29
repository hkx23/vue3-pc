export default [
  {
    path: '/mitemuom',
    name: 'mitemuom',
    component: () => import('../../pages/mitemuom/index.vue'),
    meta: {
      title: {
        'zh-CN': '计量单位',
        'en-US': 'Mitem Uom',
      },
      orderNo: 0,
    },
  },
];
