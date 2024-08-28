import { DomainParamSetting } from '@/api/main';

export default {
  tableSetting: {
    columnSetting: [
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目代码',
        columnKey: null,
        columnName: 'maintenance_item_code',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: null,

        id: '2191079040821903360',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 1,
        tableName: 'e_maintenance_item_20240807154950',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目名称',
        columnKey: null,
        columnName: 'maintenance_item_name',
        columnType: 'varchar(240)',
        columnWidth: 100,
        componentSource: null,

        id: '2339018370868926464',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 2,
        tableName: 'e_maintenance_item_20240807154950',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目要求',
        columnKey: null,
        columnName: 'maintenance_item_require',
        columnType: 'varchar(2000)',
        columnWidth: 100,
        componentSource: null,

        id: '1458433266892703744',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 3,
        tableName: 'e_maintenance_item_20240807154950',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养周期',
        columnKey: null,
        columnName: 'maintenance_period',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: {
          customDict: {
            dicData: [
              {
                label: '每天',
                value: 'DAY',
              },
              {
                label: '每周',
                value: 'WEEK',
              },
              {
                label: '每月',
                value: 'MONTH',
              },
              {
                label: '每季度',
                value: 'QUARTER',
              },
              {
                label: '每年',
                value: 'YEAR',
              },
            ],
          },
          dataTable: null,
          sourceType: null,
        },

        id: '8332476488291024896',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 4,
        tableName: 'e_maintenance_item_20240807154950',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '是否拍照',
        columnKey: null,
        columnName: 'is_photo',
        columnType: 'int',
        columnWidth: 100,
        componentSource: {
          customDict: {
            dicData: [
              {
                label: '是',
                value: '1',
              },
              {
                label: '否',
                value: '0',
              },
            ],
          },
          dataTable: null,
          sourceType: null,
        },

        id: '8962240844128741376',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 5,
        tableName: 'e_maintenance_item_20240807154950',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养计划名称',
        columnKey: null,
        columnName: 'maintenance_plan_name',
        columnType: 'varchar(240)',
        columnWidth: 100,
        componentSource: null,

        id: '6231537912799950848',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: null,

        seq: 6,
        tableName: 'e_maintenance_plan_20240807154920',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养计划代码',
        columnKey: null,
        columnName: 'maintenance_plan_code',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: null,

        id: '3151914616643844096',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: null,

        seq: 7,
        tableName: 'e_maintenance_plan_20240807154920',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备保养计划表ID',
        columnKey: '',
        columnName: 'e_maintenance_plan_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '4373934838023526400',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 8,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备保养项目表ID',
        columnKey: '',
        columnName: 'e_maintenance_item_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '8266799586802493440',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 9,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '',
        columnKey: 'PRI',
        columnName: 'id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '609238541555138560',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 10,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '创建时间',
        columnKey: '',
        columnName: 'time_create',
        columnType: 'datetime(4)',
        columnWidth: 100,
        componentSource: null,

        id: '1692426775317663744',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 11,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '创建人',
        columnKey: '',
        columnName: 'creator',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: null,

        id: '8107219159207809024',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 12,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '修改时间',
        columnKey: '',
        columnName: 'time_modified',
        columnType: 'datetime(4)',
        columnWidth: 100,
        componentSource: null,

        id: '8908131301733191680',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 13,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '修改人',
        columnKey: '',
        columnName: 'modifier',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: null,

        id: '3439924696676319232',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 14,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '1可用；0禁用',
        columnKey: '',
        columnName: 'state',
        columnType: 'int',
        columnWidth: 100,
        componentSource: null,

        id: '6990110445450967040',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 15,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '企业ID',
        columnKey: 'MUL',
        columnName: 'eid',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '218525304973686784',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 16,
        tableName: 'e_maintenance_plan_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '组织ID',
        columnKey: '',
        columnName: 'oid',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '8676954566930300928',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 17,
        tableName: 'e_maintenance_plan_item',
      },
    ],
    pageSize: null,
    sortField: 'time_create',
    sortType: 'desc',
    tableTitle: '设备保养计划项目',
    usePage: true,
  },
} as DomainParamSetting;
