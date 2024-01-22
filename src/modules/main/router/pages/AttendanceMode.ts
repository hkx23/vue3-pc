export default [
  {
    path: '/AttendanceMode',
    name: 'AttendanceMode',
    component: () => import('../../pages/AttendanceMode/index.vue'),
    meta: {
      title: {
        'zh-CN': '出勤模式',
        'en-US': 'AttendanceMode',
      },
      orderNo: 0,
    },
  },
];
