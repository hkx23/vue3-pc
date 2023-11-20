import { MockMethod } from '@/types/web-core';

export default [
  {
    url: '/api/auth/oauth2/token',
    method: 'POST',
    response: {
      code: 200,
      message: '操作成功',
      data: {
        access_token: '13065cc1-6713-43e1-b844-fe8f8b66ee87',
        refresh_token: '5febc620-ef8e-4804-b876-ddb4b39537da',
        token_type: 'Bearer',
        expires_in: 13250,
      },
    },
  },
  {
    url: '/api/system/module/show?clientType=1',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        message: '操作成功',
        data: [
          {
            path: '/system',
            name: '系统',
            component: 'LAYOUT',
            redirect: '/system/modeling',
            meta: {
              title: {
                zh_CN: '系统',
              },
              icon: 'system-3',
              frameSrc: '',
            },
            children: [
              {
                path: 'modeling',
                name: '工厂建模',
                component: 'LAYOUT',
                redirect: '/system/modeling/orgLevel',
                meta: {
                  title: {
                    zh_CN: '工厂建模',
                  },
                  icon: 'museum',
                  frameSrc: null,
                },
                children: [
                  {
                    path: 'orgLevel',
                    name: '组织层级',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '组织层级',
                      },
                      icon: null,
                      frameSrc: '/modeling#/orgLevel',
                    },
                    children: [],
                  },
                  {
                    path: 'person',
                    name: '员工',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '员工',
                      },
                      icon: null,
                      frameSrc: '/modeling#/person',
                    },
                    children: [],
                  },
                  {
                    path: 'mitemCategory',
                    name: '物料分类',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '物料分类',
                      },
                      icon: null,
                      frameSrc: '/modeling#/mitemCategory',
                    },
                    children: [],
                  },
                  {
                    path: 'customer',
                    name: '客户',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '客户',
                      },
                      icon: null,
                      frameSrc: '/modeling#/customer',
                    },
                    children: [],
                  },
                  {
                    path: 'org',
                    name: '生产组织架构',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '生产组织架构',
                      },
                      icon: null,
                      frameSrc: '/modeling#/org',
                    },
                    children: [],
                  },
                  {
                    path: 'mitem',
                    name: '物料',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '物料',
                      },
                      icon: null,
                      frameSrc: '/modeling#/mitem',
                    },
                    children: [],
                  },
                  {
                    path: 'workStation',
                    name: '工站',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '工站',
                      },
                      icon: null,
                      frameSrc: '/modeling#/workStation',
                    },
                    children: [],
                  },
                  {
                    path: 'workCenter',
                    name: '工作中心',
                    component: 'IFrame',
                    redirect: null,
                    meta: {
                      title: {
                        zh_CN: '工作中心',
                      },
                      icon: null,
                      frameSrc: '/modeling#/workCenter',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
] as MockMethod[];
