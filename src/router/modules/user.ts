import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: { 'zh-CN': '个人中心', 'en-US': 'User Center' }, icon: 'user-circle' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: { 'zh-CN': '个人中心', 'en-US': 'User Center' } },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: { 'zh-CN': '登录页', 'en-US': 'Login' }, icon: shallowRef(LogoutIcon) },
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'index',
        redirect: '/login',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: { 'zh-CN': '登录页', 'en-US': 'Login' } },
      },
    ],
  },
];
