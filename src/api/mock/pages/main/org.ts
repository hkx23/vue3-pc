/* eslint-disable */
/* tslint:disable */

import { MockMethod } from '@/types/web-core';

export default [
  {
    url: '/api/main/org/tree',
    method: 'GET',
    response: {
      code: 200,
      message: '操作成功',
      data: [
        {
          id: '1725460890953371649',
          levelCode: 'GROUP',
          levelName: null,
          children: [
            {
              id: '1725461564969635842',
              levelCode: 'PLANT',
              levelName: null,
              children: [
                {
                  id: '1725462570604351489',
                  levelCode: 'WORKSHOP',
                  levelName: null,
                  children: [],
                  orgCode: 'A0101',
                  orgName: '炼丹车间',
                  orgDesc: '炼丹车间',
                  parentOrgId: '1725461564969635842',
                },
                {
                  id: '1725462598978818049',
                  levelCode: 'WORKSHOP',
                  levelName: null,
                  children: [],
                  orgCode: 'A0102',
                  orgName: '炼器车间',
                  orgDesc: '炼器车间',
                  parentOrgId: '1725461564969635842',
                },
              ],
              orgCode: 'A01',
              orgName: '天宫生产基地',
              orgDesc: '天宫生产基地',
              parentOrgId: '1725460890953371649',
            },
            {
              id: '1725462129694920705',
              levelCode: 'PLANT',
              levelName: null,
              children: [
                {
                  id: '1725462819762786305',
                  levelCode: 'WORKSHOP',
                  levelName: null,
                  children: [],
                  orgCode: 'A0202',
                  orgName: '御兽车间',
                  orgDesc: '御兽车间',
                  parentOrgId: '1725462129694920705',
                },
                {
                  id: '1725462904487727105',
                  levelCode: 'WORKSHOP',
                  levelName: null,
                  children: [],
                  orgCode: 'A0201',
                  orgName: '茶叶车间',
                  orgDesc: '茶叶车间',
                  parentOrgId: '1725462129694920705',
                },
              ],
              orgCode: 'A02',
              orgName: '广寒宫生产基地',
              orgDesc: '广寒宫生产基地',
              parentOrgId: '1725460890953371649',
            },
          ],
          orgCode: 'A00',
          orgName: 'xxx科技有限公司',
          orgDesc: 'xxx科技有限公司',
          parentOrgId: '0',
        },
      ],
    },
  },
] as MockMethod[];
