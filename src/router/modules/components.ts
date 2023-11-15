export default [
  {
    path: '/components',
    name: 'components',
    // component: Layout,
    redirect: '/components/default',
    meta: {
      title: {
        zh_CN: '组件',
        en_US: 'Components',
      },
      icon: 'check-circle',
    },
    children: [
      {
        path: 'selecttable',
        name: 'selecttable',
        component: () => import('@/components/select-table/index.vue'),
        meta: {
          title: {
            zh_CN: '业务选择表格',
            en_US: 'Success',
          },
        },
      },
      {
        path: 'selectbusiness',
        name: 'selectbusiness',
        component: () => import('@/components/select-business/index.vue'),
        meta: {
          title: {
            zh_CN: '业务选择',
            en_US: 'Success',
          },
        },
      },
      {
        path: 'businessexample',
        name: 'businessexample',
        component: () => import('@/modules/demo/pages/componentExample/index.vue'),
        meta: {
          title: {
            zh_CN: '业务选择',
            en_US: 'Success',
          },
        },
      },
    ],
  },
];
