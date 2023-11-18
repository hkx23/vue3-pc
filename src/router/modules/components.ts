import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/components',
    name: 'components',
    component: Layout,
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
        path: 'businessexample',
        name: 'businessexample',
        component: () => import('@/modules/demo/pages/componentExample/index.vue'),
        meta: {
          title: {
            zh_CN: '业务选择组件例子',
            en_US: 'bussiness example',
          },
        },
      },
    ],
  },
];
