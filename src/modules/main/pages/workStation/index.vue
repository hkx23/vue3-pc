<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="onHandelResetting" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="index"
        :table-column="columns"
        :table-data="workData"
        lazy-load
        :fixed-height="true"
        :total="total"
        :loading="loading"
        @refresh="onHandelList"
      >
        <template #button>
          <t-button variant="base" @click="onHandelAdd">新增</t-button>
        </template>
        <template #state="{ row }">
          <span>{{ row.state === 1 ? '启用' : '禁用' }}</span>
        </template>
        <template #op="{ row }">
          <t-space>
            <!-- 编辑 -->
            <t-link theme="primary" @click="onHandelEdit(row.id)">{{ t('common.button.edit') }}</t-link>
            <!-- 禁用 -->
            <t-popconfirm :content="row.state ? '确认禁用吗' : '确认启用吗'" @confirm="onHandleDisable(row)">
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog
    v-model:visible="formVisible"
    :header="controlShow ? '编辑' : '新增'"
    @reset="onSecondaryReset"
    @confirm="onFormSubmit"
  >
    <t-form
      ref="formRef"
      :rules="rules"
      :data="formData"
      scroll-to-first-error="smooth"
      label-align="right"
      @submit="onWorkStationSubmit"
    >
      <!-- 工作中心-->
      <t-form-item label="工作中心:" name="PWorkcenterId">
        <!-- <t-select v-model="formData.workCenter"></t-select> -->
        <bcmp-select-business
          v-model="formData.PWorkcenterId"
          type="workcenter"
          :show-title="false"
          :disabled="controlShow ? true : false"
        ></bcmp-select-business>
      </t-form-item>
      <!-- 工序 -->
      <t-form-item label="工序:" name="PProcessId">
        <bcmp-select-business
          v-model="formData.PProcessId"
          type="process"
          :show-title="false"
          :disabled="controlShow ? true : false"
        ></bcmp-select-business>
      </t-form-item>
      <!-- 工站代码 -->
      <t-form-item label="工站代码:" name="workstationCode">
        <t-input v-model="formData.workstationCode" :disabled="controlShow ? true : false"></t-input>
      </t-form-item>
      <!-- 工站名称 -->
      <t-form-item label="工站名称:" name="workstationName">
        <t-input v-model="formData.workstationName"></t-input>
      </t-form-item>
      <!--工站描述  -->
      <t-form-item label="工站描述:" name="workstationDesc">
        <t-input v-model="formData.workstationDesc"></t-input>
      </t-form-item>
      <!--启用  -->
      <t-form-item label="启用:" name="state">
        <t-switch v-model="formData.showState" size="large" @change="onChange" />
      </t-form-item>
      <!-- 控制盒子 -->
      <!-- <div class="control-box">
        <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
        <t-button theme="primary" type="submit">保存</t-button>
      </div> -->
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next/es/table/type';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import BcmpSelectBusiness from '../../../../components/bcmp-select-business/index.vue';
import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const formVisible = ref(false); // 控制弹窗显示
const controlShow = ref(false); // 控制确认按钮编辑和新增
const formRef: Ref<FormInstanceFunctions> = ref(null);
const total = ref(0); // 控制页面总数
// 下拉定义
const inputValue = ref({
  state: [],
  statevalue: -1,
  workstaion: '',
  workcenter: '',
  process: '',
});
// 挂载
onMounted(() => {
  onHandelList();
});

// 页面请求
const onHandelList = async () => {
  const STATE = inputValue.value.statevalue;
  try {
    setLoading(true);
    if (STATE === -1) {
      inputValue.value.state = [1, 0];
    } else if (STATE === 1) {
      inputValue.value.state = [1];
    } else if (STATE === 0) {
      inputValue.value.state = [0];
    } else {
      inputValue.value.state = [1, 0];
    }
    const res = await api.workstation.getlist({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      workstaion: inputValue.value.workstaion,
      state: inputValue.value.state,
      workcenter: inputValue.value.workcenter,
      process: inputValue.value.process,
    });
    workData.value = res.list;
    total.value = +res.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 下拉初始数据
const options2 = [
  { label: '全部', value: -1 },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];
// 子体给到value
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'workstationCode',
    title: '工站代码',
    width: '100px',
    align: 'center',
  },
  {
    colKey: 'workstationName',
    title: '工站名称',
    width: '160px',
    align: 'center',
  },
  {
    colKey: 'workstationDesc',
    title: '工站描述',
    width: '160px',
    align: 'center',
  },
  {
    colKey: 'workcenterName',
    title: '工站中心',
    width: '160px',
    align: 'center',
  },
  {
    colKey: 'processName',
    title: '工序',
    width: '160px',
    align: 'center',
  },
  {
    align: 'center',
    colKey: 'state',
    title: '状态',
    width: '90px',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    width: '170px',
    align: 'center',
  },
  {
    colKey: 'modifierName',
    title: '更新人',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'timeModified',
    title: '更新时间',
    width: '170px',
    align: 'center',
  },
  {
    colKey: 'op',
    title: '操作',
    width: '120px',
    align: 'left',
    fixed: 'right',
  },
];
// 表单
const formData = ref({
  PWorkcenterId: '', // 工作中心
  PProcessId: '', // 工序
  workstationCode: '', // 工作代码
  workstationName: '', // 工作名称
  workstationDesc: '', // 工作描述
  state: 1, // 控制是否启用
  showState: true,
  id: '',
});
// table数据
const workData = ref([]);
// 点击查询按钮
const conditionEnter = (data: any) => {
  inputValue.value.workstaion = data.workstaion;
  inputValue.value.statevalue = data.statevalue;
  inputValue.value.workcenter = data.workcenter;
  inputValue.value.process = data.process;
  onHandelQuery();
};
const opts = computed(() => {
  return {
    workstaion: {
      label: '工站代码/名称',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工序代码/名称',
    },
    statevalue: {
      label: '状态',
      comp: 't-select',
      bind: {
        options: options2,
        lazyLoad: true,
      },
      defaultVal: '',
      placeholder: '请选择状态',
    },
    workcenter: {
      label: '工作中心',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工作中心',
    },
    process: {
      label: '工序',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工序代码/名称',
    },
  };
});

// 新增编辑按钮
const onHandelE = (id) => {
  // 编辑
  if (id !== -1) {
    controlShow.value = true;
    workData.value.forEach((item) => {
      if (item.id === id) {
        formData.value.id = id;
        formData.value.PWorkcenterId = item.workcenterId;
        formData.value.PProcessId = item.processId;
        formData.value.workstationCode = item.workstationCode;
        formData.value.workstationName = item.workstationName;
        formData.value.workstationDesc = item.workstationDesc;
        // console.log('1', formData);
        if (formData.value.state === item.state) {
          console.log(1);
          formData.value.showState = true;
        } else {
          console.log(2);
          formData.value.showState = false;
        }
      }
    });
  } else {
    // 新增
    formRef.value.reset({ type: 'initial' });
    controlShow.value = false;
  }
};
// 编辑
const onHandelEdit = (value) => {
  formRef.value.reset({ type: 'initial' });
  onHandelE(value);
  formVisible.value = true;
};
// 关闭清空
// const onClose = () => {
//   // formRef.value.reset({ type: 'initial' });
// };
// 新增
const onHandelAdd = () => {
  formRef.value.reset({ type: 'initial' });
  formVisible.value = true;
  onHandelE(-1);
};
const onFormSubmit = () => {
  formRef.value.submit();
};
// 查询
const onHandelQuery = async () => {
  pageUI.value.page = 1;
  await onHandelList();
};
// 重置
const onHandelResetting = () => {
  inputValue.value.process = '';
  inputValue.value.state = [];
  inputValue.value.statevalue = -1;
  inputValue.value.workcenter = '';
  inputValue.value.workstaion = '';
};
// 禁用
const onHandleDisable = async (value) => {
  console.log('console.log(value.state);', value.state);
  if (value.state !== 1) {
    value.state = 1;
  } else {
    value.state = 0;
  }
  console.log('console.log(value.state);', value.state);
  await api.workstation.edit({
    id: value.id,
    state: value.state,
  });
  onHandelList();
};
// 是否启用
const onChange = (value) => {
  console.log(value);
  if (value) {
    inputValue.value.state = [1];
    formData.value.state = 1;
  } else {
    inputValue.value.state = [0];
    formData.value.state = 0;
  }
};
// 取消
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'initial' });
  MessagePlugin.success('取消成功');
  formVisible.value = false;
};

// 二次保存
// const onSecondary = async () => {};
// 保存确认按钮
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// form保存
const onWorkStationSubmit = async (context: RootObject) => {
  if (context.validateResult === true) {
    if (controlShow.value) {
      console.log('12', formData.value.state);
      try {
        await api.workstation.edit({
          id: formData.value.id,
          processId: formData.value.PProcessId,
          workcenterId: formData.value.PWorkcenterId,
          workstationCode: formData.value.workstationCode,
          workstationName: formData.value.workstationName,
          workstationDesc: formData.value.workstationDesc,
          state: formData.value.state,
        });

        MessagePlugin.success('保存成功');
        formVisible.value = false;
        onHandelList();
      } catch (e) {
        console.log(e);
      } finally {
        // formRef.value.reset({ type: 'initial' });
      }
      // 编辑
    } else {
      // 新增逻辑
      try {
        await api.workstation.add({
          workstationCode: formData.value.workstationCode,
          workstationName: formData.value.workstationName,
          workstationDesc: formData.value.workstationDesc,
          workcenterId: formData.value.PWorkcenterId,
          processId: formData.value.PProcessId,
          state: formData.value.state,
        });
        MessagePlugin.success('保存成功');
        onHandelList();
        formVisible.value = false;
      } catch (e) {
        console.log(e);
      } finally {
        // formRef.value.reset({ type: 'initial' });
      }
    }
  }
};
// 校验
const rules: FormRules<Data> = {
  PWorkcenterId: [
    {
      required: true,
      type: 'error',
    },
  ],
  PProcessId: [
    {
      required: true,
      type: 'error',
    },
  ],
  workstationCode: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  workstationName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.btn-left {
  display: flex;
  justify-content: flex-end;
}

.form-work-station {
  margin: 10px 0;
}
// 按钮盒子
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}
// 启动按钮样式更改
:deep(.t-switch.t-is-checked:hover) {
  background: var(--td-success-color-4);
}

:deep(.t-switch.t-is-checked) {
  background: var(--td-success-color-4);
}
</style>
