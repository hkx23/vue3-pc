import { DomainParamTableColumn } from '@/api/main';

export default {
  tableSetting: {
    columnSetting: [
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '故障代码',
        columnKey: '',
        columnName: 'repair_item_code',
        columnType: 'varchar(80)',
        columnWidth: 100,

        id: '5560537921682362368',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 1,
        tableName: 'e_repair_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '故障描述',
        columnKey: '',
        columnName: 'repair_item_name',
        columnType: 'varchar(2000)',
        columnWidth: 100,

        id: '8964722529001308160',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 2,
        tableName: 'e_repair_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '维修方法',
        columnKey: '',
        columnName: 'repair_item_method',
        columnType: 'varchar(2000)',
        columnWidth: 100,

        id: '7137773478589517824',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 3,
        tableName: 'e_repair_item',
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

        id: '6593358722933473280',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 4,
        tableName: 'e_repair_item',
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

        id: '3156519966244200448',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 5,
        tableName: 'e_repair_item',
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

        id: '3433588720423458816',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 6,
        tableName: 'e_repair_item',
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

        id: '1442247135381493760',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 7,
        tableName: 'e_repair_item',
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

        id: '4217611165175418880',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 8,
        tableName: 'e_repair_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '启用状态',
        columnKey: '',
        columnName: 'state',
        columnType: 'int',
        columnWidth: 100,

        id: '8025390211176169472',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 9,
        tableName: 'e_repair_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '作业指导书',
        columnKey: '',
        columnName: 'sop',
        columnType: 'int',
        columnWidth: 100,

        id: '作业指导书',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 9,
        tableName: 'e_repair_item',
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

        id: '2834159895836973056',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 10,
        tableName: 'e_repair_item',
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

        id: '8481970777069451264',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 11,
        tableName: 'e_repair_item',
      },
    ],
    pageSize: null,
    sortField: 'time_create',
    sortType: 'desc',
    tableTitle: '模具维修项目信息',
    usePage: true,
  },
} as DomainParamTableColumn;
