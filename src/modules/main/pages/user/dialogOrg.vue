<template>
  <t-dialog
    v-model:visible="visible"
    :header="t('user.org')"
    width="600px"
    :confirm-on-enter="true"
    :on-confirm="onConfirmAnother"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-table
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data="orgData"
        :selected-row-keys="selectedRowKeys"
        lazy-load
        @select-change="rehandleSelectChange"
      >
        <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
        <template #defaultOrg="{ row }">
          <t-radio v-model="row.default" @change="setDefaultOrg(row)"></t-radio>
        </template>
      </t-table>
    </t-space>
  </t-dialog>
  <!-- <t-dialog
      v-model:visible="formVisible"
      :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('user.user')])"
      :on-confirm="onConfirmForm"
    >
  </t-dialog> -->
</template>

<script setup lang="tsx">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, ref, watch } from 'vue';

import { api, User, UserOrgDTO } from '@/api/main';

import { useLang } from './lang';

const { t } = useLang();

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const orgData = ref([]);
const selectedRowKeys = ref([]);

const loading = ref(false);
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    // title: '单选',
    // align: 'center',
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
    checkProps: ({ row }) => ({ disabled: row.default }),
  },
  {
    title: '默认库存组织',
    align: 'center',
    colKey: 'defaultOrg',
    width: 100,
  },
  { colKey: 'orgCode', title: '组织代码', width: '120' },
  { colKey: 'orgName', title: '组织名称', ellipsis: true },
  { colKey: 'orgDesc', title: '组织描述', ellipsis: true },
];

// const submit = async () => {
//   return new Promise((resolve, reject) => {

//       formData.id = props.id;
//       api.user
//         .resetPassword(formData)
//         .then(() => {
//           MessagePlugin.success(t('user.resetPasswordSuccess'));
//           resolve(formData);
//         })
//         .catch((err) => {
//           MessagePlugin.error(err.message);
//           reject();
//         });
//     });
// };

// 加载角色数据表格
const fetchOrgData = async () => {
  loading.value = true;
  // setLoading(true);
  try {
    // 按用户获取用户与组织关系数据
    const data = (await api.userInOrg.getUserInOrgByUserId({ userId: props.id })) as any;
    orgData.value = data;
    // selectedRowKeys等于结果集中relate为true的id
    selectedRowKeys.value = data.filter((item) => item.relate).map((item) => item.id);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
    // setLoading(false);
  }
};
const rehandleSelectChange = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
  const userDatas: UserOrgDTO = {
    userId: props.id,
    orgIds: selectedRowKeys.value,
  };

  api.userInOrg
    .addUserInOrg(userDatas)
    .then(() => {
      MessagePlugin.success(t('user.setUserOrgsSuccess'));
      fetchOrgData();
    })
    .catch((err) => {
      MessagePlugin.error(err.message);
    });
};
const setDefaultOrg = (row: any) => {
  console.log('默认库存组织', row);
  const userData: User = reactive({
    id: props.id,
    orgId: row.id,
  });

  api.user
    .setDefaultOrg(userData)
    .then(() => {
      MessagePlugin.success(t('user.setDefaultSuccess'));
      fetchOrgData();
    })
    .catch((err) => {
      MessagePlugin.error(err.message);
    });
};
const onConfirmAnother = (context) => {
  console.log('点击了确认按钮', context);
  visible.value = false;
  // submit().then((data) => {
  //   console.log('提交成功', data);
  //   visible.value = false;
  // });
  //
};
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});

watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    // 打开时候加载数据
    fetchOrgData();
  }
});
</script>

<style lang="less" scoped></style>
