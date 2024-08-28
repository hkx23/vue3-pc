import { DomainParamSetting } from '@/api/main';

export default {
  tableSetting: {
    columnSetting: [
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目代码',
        columnKey: '',
        columnName: 'maintenance_item_code',
        columnType: 'varchar(80)',
        columnWidth: 100,

        id: '8417007597286948864',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 0,
        tableName: 'e_maintenance_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目名称',
        columnKey: '',
        columnName: 'maintenance_item_name',
        columnType: 'varchar(240)',
        columnWidth: 100,

        id: '8079140693322721280',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 1,
        tableName: 'e_maintenance_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养项目要求',
        columnKey: '',
        columnName: 'maintenance_item_require',
        columnType: 'varchar(2000)',
        columnWidth: 100,

        id: '3663260946553165824',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'YES',

        seq: 2,
        tableName: 'e_maintenance_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '保养周期',
        columnKey: null,
        columnName: 'maintenancePeriodName',
        columnType: 'varchar(240)',
        columnWidth: 100,

        id: '7291188965850288128',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: -1,
        tableName: 's_param_20240805144259',
      },
      {
        align: 'center',
        canDelete: false,
        columnDefault: null,
        columnDesc: '保养周期',
        columnKey: '',
        columnName: 'maintenance_period',
        columnType: 'varchar(80)',
        columnWidth: 100,

        id: '5811999930571229184',
        isAutoWidth: false,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 3,
        tableName: 'e_maintenance_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '是否拍照',
        columnKey: '',
        columnName: 'is_photo',
        columnType: 'int',
        columnWidth: 100,

        id: '2869657777317466112',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 4,
        tableName: 'e_maintenance_item',
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

        id: '5563683092518062080',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 5,
        tableName: 'e_maintenance_item',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '有效',
        columnKey: '',
        columnName: 'state',
        columnType: 'int',
        columnWidth: 100,

        id: '873288551683076096',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 10,
        tableName: 'e_maintenance_item',
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

        id: '4122982392095916032',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 7,
        tableName: 'e_maintenance_item',
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

        id: '2743210957659762688',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: 'NO',

        seq: 6,
        tableName: 'e_maintenance_item',
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

        id: '6656486853401825280',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 8,
        tableName: 'e_maintenance_item',
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

        id: '8625720559212785664',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 9,
        tableName: 'e_maintenance_item',
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

        id: '5456451110613661696',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 11,
        tableName: 'e_maintenance_item',
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

        id: '6283658517596313600',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 12,
        tableName: 'e_maintenance_item',
      },
    ],
    pageSize: null,
    sortField: 'time_create',
    sortType: 'desc',
    tableTitle: '设备保养项目',
    usePage: true,
  },
} as DomainParamSetting;
