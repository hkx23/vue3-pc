import { DomainParamButtonSetting } from '@/api/main';

export default {
  formColumnSetting: [
    {
      columnType: 'varchar(80)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: true,
      field: 'repair_item_code',
      fieldType: null,
      id: '5560537921682362368',
      isKeyField: true,
      isMultiple: false,
      isRequired: true,
      isVisible: true,
      label: '故障代码',
      placeholder: null,
      seq: 1,
      verifyExp: '',
    },
    {
      columnType: 'varchar(2000)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'repair_item_name',
      fieldType: null,
      id: '8964722529001308160',

      isKeyField: false,
      isMultiple: false,
      isRequired: true,
      isVisible: true,

      label: '故障描述',

      placeholder: null,

      seq: 2,
      verifyExp: '',
    },
    {
      columnType: 'varchar(2000)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'repair_item_method',
      fieldType: null,
      id: '7137773478589517824',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: true,

      label: '维修方法',

      placeholder: null,

      seq: 3,
      verifyExp: '',
    },
    {
      columnType: 'varchar(80)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'creator',
      fieldType: null,
      id: '6593358722933473280',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '创建人',

      placeholder: null,

      seq: 4,
      verifyExp: '',
    },
    {
      columnType: 'bigint',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'eid',
      fieldType: null,
      id: '3156519966244200448',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '企业ID',

      placeholder: null,

      seq: 5,
      verifyExp: '',
    },
    {
      columnType: 'bigint',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'id',
      fieldType: null,
      id: '3433588720423458816',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '',

      placeholder: null,

      seq: 6,
      verifyExp: '',
    },
    {
      columnType: 'varchar(80)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'modifier',
      fieldType: null,
      id: '1442247135381493760',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '修改人',

      placeholder: null,

      seq: 7,
      verifyExp: '',
    },
    {
      columnType: 'bigint',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'oid',
      fieldType: null,
      id: '4217611165175418880',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '组织ID',

      placeholder: null,

      seq: 8,
      verifyExp: '',
    },
    {
      columnType: 'int',
      component: 't-switch',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'state',
      fieldType: null,
      id: '8025390211176169472',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: true,

      label: '启用',

      placeholder: null,

      seq: 9,
      verifyExp: '',
    },
    {
      columnType: 'datetime(4)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'time_create',
      fieldType: null,
      id: '2834159895836973056',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '创建时间',

      placeholder: null,

      seq: 10,
      verifyExp: '',
    },
    {
      columnType: 'datetime(4)',
      component: 't-input',
      componentParam: '',
      componentSource: null,
      defaultValue: '',
      isDisabled: false,
      field: 'time_modified',
      fieldType: null,
      id: '8481970777069451264',

      isKeyField: false,
      isMultiple: false,
      isRequired: false,
      isVisible: false,

      label: '修改时间',

      placeholder: null,
      seq: 11,
      verifyExp: '',
    },
  ],
} as DomainParamButtonSetting;
