import { DomainParamSetting } from '@/api/main';

export default {
  tableSetting: {
    columnSetting: [
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具类型',
        columnKey: null,
        columnName: 'mouldType',
        columnType: 'varchar(240)',
        columnWidth: 100,

        id: '610877992992075571x',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: -4,
        tableName: 'm_mould_20240731165220',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具类型名称',
        columnKey: null,
        columnName: 'mouldTypeName',
        columnType: 'varchar(240)',
        columnWidth: 100,

        id: '6108779929920755712',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: true,

        nullable: null,

        seq: -3,
        tableName: 's_param_20240731165308',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具代码',
        columnKey: null,
        columnName: 'mould_code',
        columnType: 'varchar(80)',
        columnWidth: 100,

        id: '3162799594893805568',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: null,

        seq: -2,
        tableName: 'm_mould_20240731165220',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具名称',
        columnKey: null,
        columnName: 'mould_name',
        columnType: 'varchar(240)',
        columnWidth: 100,

        id: '189384300001028096',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: false,
        isHandAdd: true,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: null,

        seq: -1,
        tableName: 'm_mould_20240731165220',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '故障项目表ID',
        columnKey: '',
        columnName: 'e_maintenance_item_id',
        columnType: 'bigint',
        columnWidth: 100,

        id: '7074169511581835264',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 0,
        tableName: 'e_maintenance_item_in_equipment',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '资产品牌表ID',
        columnKey: '',
        columnName: 'm_asset_brand_id',
        columnType: 'bigint',
        columnWidth: 100,

        id: '5071067676293683200',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 1,
        tableName: 'e_maintenance_item_in_equipment',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '资产型号表ID',
        columnKey: '',
        columnName: 'm_asset_model_id',
        columnType: 'bigint',
        columnWidth: 100,

        id: '3360122505327278080',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 2,
        tableName: 'e_maintenance_item_in_equipment',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '资产类型表ID',
        columnKey: '',
        columnName: 'm_asset_type_id',
        columnType: 'bigint',
        columnWidth: 100,

        id: '5519903825985478656',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 3,
        tableName: 'e_maintenance_item_in_equipment',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具表ID',
        columnKey: '',
        columnName: 'm_mould_id',
        columnType: 'bigint',
        columnWidth: 100,

        id: '8794653969524314112',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 4,
        tableName: 'e_maintenance_item_in_equipment',
      },
      {
        align: 'center',

        canDelete: false,
        columnDefault: null,
        columnDesc: '模具类型',
        columnKey: '',
        columnName: 'mould_type',
        columnType: 'varchar(80)',
        columnWidth: 100,

        id: '6576171639978893312',
        isAutoWidth: true,
        isDataDefault: false,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 5,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '1751860826946289664',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 6,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '8646565055337807872',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 7,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '2743916374271356928',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 8,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '41912747687444480',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 9,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '8872780942841815040',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 10,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '7113690172860616704',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 11,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '4839361570755266560',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'NO',

        seq: 12,
        tableName: 'e_maintenance_item_in_equipment',
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

        id: '684207745880256512',
        isAutoWidth: true,
        isDataDefault: true,
        isDatabaseField: true,
        isHandAdd: false,
        isLeftFixed: false,
        isRightFixed: false,
        isVisible: false,

        nullable: 'YES',

        seq: 13,
        tableName: 'e_maintenance_item_in_equipment',
      },
    ],
    pageSize: 10,
    sortField: 'time_create',
    sortType: 'desc',
    tableTitle: '设备与保养项目关系表',
    usePage: true,
  },
} as DomainParamSetting;
