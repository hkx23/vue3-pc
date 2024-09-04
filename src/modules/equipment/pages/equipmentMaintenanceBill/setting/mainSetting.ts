import { DomainParamSetting } from '@/api/main';

export default {
  tableSetting: {
    columnSetting: [
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '单据编号',
        columnKey: '',
        columnName: 'bill_no',
        columnType: 'varchar(80)',
        columnWidth: 180,
        componentSource: null,

        id: '5898059195156819968',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 1,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养计划编码',
        columnKey: '',
        columnName: 'maintenance_plan_code',
        columnType: 'varchar(80)',
        columnWidth: 150,
        componentSource: null,

        id: '3708745966942134272',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 2,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养计划名称',
        columnKey: '',
        columnName: 'maintenance_plan_name',
        columnType: 'varchar(80)',
        columnWidth: 150,
        componentSource: null,

        id: '7064048853375649792',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 3,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养计划方式',
        columnKey: '',
        columnName: 'maintenance_plan_type',
        columnType: 'varchar(80)',
        columnWidth: 150,
        componentSource: {
          customDict: {
            dicData: [
              {
                label: '周期保养',
                value: 'PERIOD',
              },
              {
                label: '次数保养',
                value: 'USETIME',
              },
            ],
          },
          dataTable: null,
          sourceType: null,
        },

        id: '6458708398670936064',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 4,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备编码',
        columnKey: null,
        columnName: 'equipment_code',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: null,

        id: '1254562782726692864',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 5,
        tableName: 'm_equipment_20240819191005',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备名称',
        columnKey: null,
        columnName: 'equipment_name',
        columnType: 'varchar(240)',
        columnWidth: 100,
        componentSource: null,

        id: '3586431436311244800',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 6,
        tableName: 'm_equipment_20240819191005',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养状态',
        columnKey: '',
        columnName: 'status',
        columnType: 'varchar(80)',
        columnWidth: 100,
        componentSource: {
          customDict: {
            dicData: [
              {
                label: '待保养',
                value: 'UNMAINTAIN',
              },
              {
                label: '保养中',
                value: 'MAINTAINING',
              },
              {
                label: '待验收',
                value: 'UNACCEPT',
              },
              {
                label: '已关闭',
                value: 'CLOSED',
              },
              {
                label: '未完成',
                value: 'NOTFINISHED',
              },
            ],
          },
          dataTable: null,
          sourceType: null,
        },

        id: '2814183358085275648',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 7,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '计划开始时间',
        columnKey: '',
        columnName: 'datetime_plan_start',
        columnType: 'datetime(4)',
        columnWidth: 150,
        componentSource: null,

        id: '3819116494305064960',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 8,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '要求完成时间',
        columnKey: '',
        columnName: 'datetime_require_end',
        columnType: 'datetime(4)',
        columnWidth: 150,
        componentSource: null,

        id: '9057491718412447744',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 9,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养人',
        columnKey: null,
        columnName: 'userMaintenanceName',
        columnType: 'varchar(240)',
        columnWidth: 100,
        componentSource: null,

        id: '5149244406587922432',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 10,
        tableName: 's_user_handle',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养时间',
        columnKey: '',
        columnName: 'datetime_maintenance',
        columnType: 'datetime(4)',
        columnWidth: 150,
        componentSource: null,

        id: '6143374142904852480',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 11,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '验收人',
        columnKey: null,
        columnName: 'userAcceptName',
        columnType: 'varchar(240)',
        columnWidth: 100,
        componentSource: null,

        id: '3487932319874770944',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: 12,
        tableName: 's_user_receive',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '验收时间',
        columnKey: '',
        columnName: 'datetime_accept',
        columnType: 'datetime(4)',
        columnWidth: 150,
        componentSource: null,

        id: '4502256179381741568',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 13,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '下次保养时间',
        columnKey: '',
        columnName: 'datetime_maintenance_next',
        columnType: 'datetime(4)',
        columnWidth: 150,
        componentSource: null,

        id: '113164210968082432',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 14,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '计划保养小时',
        columnKey: '',
        columnName: 'hour_maintenance_plan',
        columnType: 'int',
        columnWidth: 150,
        componentSource: null,

        id: '2991812301748389888',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 15,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '实际保养小时',
        columnKey: '',
        columnName: 'hour_maintenance_actual',
        columnType: 'int',
        columnWidth: 150,
        componentSource: null,

        id: '8580326776075788288',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 16,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '下次保养次数',
        columnKey: '',
        columnName: 'use_time_maintenance_next',
        columnType: 'int',
        columnWidth: 150,
        componentSource: null,

        id: '2350560029989462016',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 17,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '计划保养次数',
        columnKey: '',
        columnName: 'number_maintenance_plan',
        columnType: 'int',
        columnWidth: 100,
        componentSource: null,

        id: '8969221323691753472',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 18,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养人员ID',
        columnKey: '',
        columnName: 'user_maintenance_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '8731186255333857280',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 19,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '车间ID',
        columnKey: '',
        columnName: 'm_workshop_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '4264301921155653632',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 20,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备ID',
        columnKey: '',
        columnName: 'm_equipment_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '1579220780526954496',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 21,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '验收人员ID',
        columnKey: '',
        columnName: 'user_accept_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '2297721678751801344',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 22,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '实际保养次数',
        columnKey: '',
        columnName: 'number_maintenance_actual',
        columnType: 'int',
        columnWidth: false,
        componentSource: null,

        id: '133123462224447488',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 23,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '备注',
        columnKey: '',
        columnName: 'memo',
        columnType: 'varchar(2000)',
        columnWidth: 100,
        componentSource: null,

        id: '5447829892824946688',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 24,
        tableName: 'e_maintenance_bill_head',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '设备ID',
        columnKey: '',
        columnName: 'm_equipment_id',
        columnType: 'bigint',
        columnWidth: 100,
        componentSource: null,

        id: '8488836914591139840',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 25,
        tableName: 'e_maintenance_bill_head',
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

        id: '1948824192285163520',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 26,
        tableName: 'e_maintenance_bill_head',
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

        id: '2882904205275760640',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 27,
        tableName: 'e_maintenance_bill_head',
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

        id: '2698432625123129344',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 28,
        tableName: 'e_maintenance_bill_head',
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

        id: '6759027423419451392',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 29,
        tableName: 'e_maintenance_bill_head',
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

        id: '8283897713361788928',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 30,
        tableName: 'e_maintenance_bill_head',
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

        id: '6825464595547531264',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 31,
        tableName: 'e_maintenance_bill_head',
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

        id: '2266192861045014528',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 32,
        tableName: 'e_maintenance_bill_head',
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

        id: '428673781422872576',
        isAutoWidth: false,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 33,
        tableName: 'e_maintenance_bill_head',
      },
    ],
    pageSize: null,
    sortField: 'time_create',
    sortType: 'desc',
    tableTitle: '设备保养单据',
    usePage: true,
  },
} as DomainParamSetting;
