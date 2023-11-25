<template>
  <div>
    <t-card class="list-card-container" :bordered="false" gutter>
      <t-row justify="space-between">
        <t-col :span="2"
          ><t-input v-model="inputValue.workstaion" label="工站代码/名称：" placeholder="请输入工序代码/名称"></t-input>
        </t-col>
        <t-col :span="2">
          <t-select
            v-model="inputValue.statevalue"
            label="状态"
            placeholder="请选择状态"
            auto-width
            :options="options2"
            clearable
          >
          </t-select>
        </t-col>
        <t-col :span="2"
          ><t-input v-model="inputValue.workcenter" label="工作中心：" placeholder="请输入工作中心/名称"></t-input>
        </t-col>
        <t-col :span="2"
          ><t-input v-model="inputValue.process" label="工序：" placeholder="请输入工序代码/名称"> </t-input>
        </t-col>
      </t-row>
      <t-row justify="space-between" style="margin: 20px 0">
        <t-col>
          <div>
            <t-button variant="base" @click="onHandelAdd">新增</t-button>
            <!-- <t-button theme="default" variant="base">导入</t-button> -->
            <!-- <input type="file" @change="handleFileUpload" />
            <button @click="importData">导入</button> -->
          </div>
        </t-col>
        <t-col flex="220px">
          <div class="btn-left">
            <t-button variant="base" @click="onHandelQuery">查询</t-button>
            <t-button theme="default" variant="base" @click="onHandelResetting">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <tm-table
        v-model:pagination="pageUI"
        row-key="index"
        :columns="columns"
        :data="workData"
        lazy-load
        :total="total"
        :loading="loading"
        @refresh="onHandelList"
      >
        <template #state="{ row }">
          <span>{{ row.state === 1 ? '启用' : '禁用' }}</span>
        </template>
        <template #operate="{ row }">
          <!-- 编辑 -->
          <icon name="edit-1" style="margin-right: 10px; cursor: pointer" @click="onHandelEdit(row.id)"></icon>
          <!-- 禁用 -->
          <t-popconfirm content="确认禁用吗" @confirm="onHandleDisable(row.id)">
            <icon name="delete" style="margin-right: 10px; cursor: pointer"></icon>
          </t-popconfirm>
        </template>
      </tm-table>
      <!-- <t-table row-key="index" :columns="columns" :data="workData" lazy-load> </t-table> -->
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      :header="controlShow ? '编辑' : '新增'"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form
        ref="formRef"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onWorkStationSubmit"
      >
        <!-- 工作中心-->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="工作中心:" name="PWorkcenterId">
              <!-- <t-select v-model="formData.workCenter"></t-select> -->
              <tm-select-business
                v-model="formData.PWorkcenterId"
                type="workcenter"
                :show-title="false"
              ></tm-select-business>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工序 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工序:" name="PProcessId">
              <tm-select-business v-model="formData.PProcessId" type="process" :show-title="false"></tm-select-business>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工站代码 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站代码:" name="workstationCode">
              <t-input v-model="formData.workstationCode"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工站名称 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站名称:" name="workstationName">
              <t-input v-model="formData.workstationName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!--工站描述  -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站描述:" name="workstationDesc">
              <t-input v-model="formData.workstationDesc"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!--启用  -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="启用:" name="state">
              <t-switch v-model="formData.showState" size="large" @change="onChange" />
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 控制盒子 -->
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-popconfirm content="确认保存吗" @confirm="onSecondary">
            <t-button theme="primary" type="submit">保存</t-button>
          </t-popconfirm>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Data, FormInstanceFunctions, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next/es/table/type';
import { onMounted, Ref, ref } from 'vue';

import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';

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
    } else {
      inputValue.value.state = [0];
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
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workstationName',
    title: '工站名称',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workstationDesc',
    title: '工站描述',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workcenterName',
    title: '工站中心',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'processName',
    title: '工序',
    width: '90px',
    align: 'center',
  },
  {
    align: 'center',
    colKey: 'state',
    title: '状态',
    width: '90px',
  },
  {
    colKey: 'creator',
    title: '创建人',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    width: '160px',
    align: 'center',
  },
  {
    colKey: 'modifier',
    title: '更新人',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'timeModified',
    title: '更新时间',
    width: '160px',
    align: 'center',
  },
  {
    colKey: 'operate',
    title: '操作',
    width: '90px',
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
          formData.value.showState = true;
        } else {
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
  onHandelE(value);
  formVisible.value = true;
};
// 关闭清空
// const onClose = () => {
//   // formRef.value.reset({ type: 'initial' });
// };
// 新增
const onHandelAdd = () => {
  formVisible.value = true;
  onHandelE(-1);
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
const onHandleDisable = (value) => {
  workData.value.forEach(async (item) => {
    if (item.id === value) {
      api.workstation
        .edit({
          id: value,
          state: 0,
        })
        .then((res) => {
          onHandelList();
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
};
// 是否启用
const onChange = (value) => {
  if (value) {
    inputValue.value.state = [1];
  } else {
    inputValue.value.state = [0];
  }
};
// 取消
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'initial' });
  MessagePlugin.success('取消成功');
  formVisible.value = false;
};
let submitShow = true; // 记录保存
// 二次保存
const onSecondary = async () => {
  if (submitShow === true) {
    return;
  }
  if (controlShow.value) {
    try {
      api.workstation.edit({
        id: formData.value.id,
        processId: formData.value.PProcessId,
        workcenterId: formData.value.PWorkcenterId,
        workstationCode: formData.value.workstationCode,
        workstationName: formData.value.workstationName,
        workstationDesc: formData.value.workstationDesc,
        state: formData.value.state,
      });
    } catch (e) {
      console.log(e);
    }
    onHandelList();
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
      onHandelList();
    } catch (e) {
      console.log(e);
    }
  }
  formRef.value.reset({ type: 'initial' });
  MessagePlugin.success('保存成功');
  formVisible.value = false;
};
// 保存确认按钮
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// form保存
const onWorkStationSubmit = (context: RootObject) => {
  if (context.validateResult === true) {
    console.log(context.validateResult);
    submitShow = false;
  }
};
// 校验
const rules: FormRules<Data> = {
  PWorkcenterId: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  PProcessId: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
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
