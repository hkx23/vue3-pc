<template>
  <div class="detailed-box">
    <!-- from -->
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
      <t-card :bordered="false">
        <header class="form-item-box">
          <t-form-item label="工作中心编号">
            <t-input v-model="formData.wcCode" />
          </t-form-item>
          <t-form-item label="所属车间">
            <tm-select-business v-model="formData.workshopID" type="workshop" :show-title="false"></tm-select-business
          ></t-form-item>
          <t-form-item label="地点">
            <t-input v-model="formData.wcLocation" style="width: 200px" />
          </t-form-item>
        </header>
        <div class="form-item-box">
          <t-form-item label="工作中心名称">
            <t-input v-model="formData.wcName" />
          </t-form-item>
          <t-form-item label="负责人">
            <t-input v-model="formData.ownerName" style="width: 180px" />
          </t-form-item>
        </div>
        <t-form-item label="父级">
          <tm-select-business v-model="formData.parentWcId" type="workcenter" :show-title="false"> </tm-select-business>
          <!-- <t-select v-model="formData.parentWcCode" /> -->
        </t-form-item>
        <footer class="form-item-box">
          <t-form-item label="类型">
            <ul class="type-box">
              <li v-for="item in typeData" :key="item.id" :class="item.show ? 'li-cur' : ''" @click="onHandleCur(item)">
                {{ item.name }}
              </li>
            </ul>
          </t-form-item>
          <t-form-item label="关联设备">
            <tm-select-business v-model="formData.wcObjectId" type="equipment" :show-title="false">
            </tm-select-business>
          </t-form-item>
        </footer>
        <span class="form-checkbox">
          <t-checkbox v-model="formData.checked">启用</t-checkbox>
        </span>
        <div style="margin: 10px 100px">
          <t-button theme="default" type="submit" :disabled="props.btnShow">添加</t-button>
          <t-button theme="default" :disabled="props.btnShow">删除</t-button>
        </div>
      </t-card>
    </t-form>
    <!-- table表格 -->
    <footer class="detailed-work-center">
      <span class="work-header">子工作中心</span>
      <div class="table-work-header">
        <!-- 表格 -->
        <tm-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="columns"
          :table-data="workData"
          :total="total"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @select-change="rehandleSelectChange"
          @refresh="fetchData"
        >
          <template #sequence>
            <div>1</div>
          </template>
          <template #wcCode="{ row }">
            <div>
              <t-icon name="chevron-right"></t-icon>
              <t-link theme="primary" underline @click="onHandelCode(row.id)">{{ row.wcCode }}</t-link>
            </div>
          </template>
        </tm-table>
        <span class="table-btn">
          <t-button @click="onHandleSave">保存</t-button>
          <t-button theme="default" @click="onHandleCancellation">取消</t-button></span
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';

import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
// 子修改传值
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const total = ref(10); // 总页数
const Emit = defineEmits(['addedShow']); // addedShow窗口
const props = defineProps({
  btnShow: {
    type: Boolean,
    default: false,
  },
  wordCenterId: {
    type: Object,
  },
  nextAdd: {
    type: Boolean,
  },
  nextArr: {
    type: Array<number>,
  },
});
onMounted(() => {
  fetchData();
});
const selectedRowKeys = ref([]); // 用于存储选中行的数组
// 首次请求
const fetchData = async () => {
  Object.assign(formData, props.wordCenterId);
  console.log('for', formData);

  try {
    setLoading(true);
    const res = await api.workcenter.getChildCenter({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      id: +props.wordCenterId.id,
      category: formData.category,
    });
    workData.value = res.list;
    total.value = res.total;
    if (props.nextAdd) {
      const list = await api.workcenter.getlist({
        pageNum: pageUI.value.page,
        pageSize: pageUI.value.rows,
        category: props.nextArr,
      });
      workData.value = list.list;
      total.value = list.total;
    }
    // 拿到渲染表单
    console.log('props', props.wordCenterId);

    // 显示
    typeData.value.forEach((item) => {
      if (formData.wcType === item.name) {
        item.show = true;
        formData.category = item.opId;
      } else {
        item.show = false;
      }
    });
    // 控制多选
    if (formData.state === 1) {
      formData.checked = true;
    } else {
      formData.checked = false;
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'wcSeq',
    title: '顺序号',
    align: 'center',
  },
  {
    colKey: 'wcCode',
    title: '工作中心编号',
    align: 'center',
  },
  {
    colKey: 'wcName',
    title: '名称',
    align: 'center',
  },
  {
    colKey: 'wcType',
    title: '类型',
    align: 'center',
  },
  {
    colKey: 'wcLocation',
    title: '地点',
    align: 'center',
  },
  {
    colKey: 'wcObjectCode',
    title: '关联设备',
    align: 'center',
  },
  {
    colKey: 'ownerName',
    title: '负责人',
    align: 'center',
  },
];
const workData = ref([]);
const formData = reactive({
  wcCode: '', // 工作中心编号
  wcName: '', // 工作中心名称
  wcLocation: '', // 地点
  workshopID: '', // 所属车间
  ownerName: '', // 负责人
  parentWcId: '', // 父级
  checked: true,
  wcType: '', // 设备类型
  state: 1, // 启用还是禁用
  category: [],
  wcObjectId: '', // 关联设备
});
const typeData = ref([
  {
    id: 1,
    name: '工作区',
    show: true,
    opId: [1],
  },
  {
    id: 2,
    name: '生产线',
    show: false,
    opId: [2],
  },
  {
    id: 3,
    name: '工段',
    show: false,
    opId: [3],
  },
  {
    id: 4,
    name: '设备',
    show: false,
    opId: [4],
  },
]);

// 点击进入发请求进子集
const onHandelCode = async (id) => {
  try {
    setLoading(true);
    const res = await api.workcenter.getChildCenter({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      id,
    });
    console.log('2res', res);
    workData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 高亮事件
const onHandleCur = (all: any) => {
  typeData.value.forEach((item) => {
    if (item.id === all.id) {
      item.show = true;
      formData.category = item.opId;
    } else {
      item.show = false;
    }
  });
};
// checked事件
const rehandleSelectChange = (value: any, ctx: any) => {
  selectedRowKeys.value = value;
  console.log('value:', value, '1', ctx);
};
// 保存
const onHandleSave = () => {
  if (props.nextAdd) {
    const list = api.workcenter.add({
      wcCode: formData.wcCode,
      wcName: formData.wcName,
      workshopId: formData.workshopID,
      parentWcId: formData.parentWcId,
      wcLocation: formData.wcLocation,
      wcObjectId: formData.wcObjectId,
      state: formData.state,
      wcOwner: formData.ownerName,
      // wcObjectType: formData.category,
      wcSeq: 0,
      // ownerId: ,
    });
    console.log(list);
  }
  MessagePlugin.success('保存成功');
  Emit('addedShow', false);
};
// 取消
const onHandleCancellation = () => {
  clearFrom();
  MessagePlugin.success('取消成功');
  Emit('addedShow', false);
};
// 清空表单

const submit = () => {
  console.log(1);
};
const clearFrom = () => {
  formData.wcCode = ''; // 工作中心编号
  formData.wcName = ''; // 工作中心名称
  formData.wcLocation = ''; // 地点
  formData.workshopID = ''; // 所属车间
  formData.ownerName = ''; // 负责人
  formData.parentWcId = ''; // 父级
  formData.checked = true;
  formData.wcType = ''; // 设备类型
  formData.category = [];
  formData.state = 1;
};
</script>

<style lang="less" scoped>
.detailed-box {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.type-box {
  display: flex;
  text-align: center;
  align-items: center;

  li {
    cursor: pointer;
    width: 47px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
  }

  li:first-child {
    border-radius: 5px 0 0 5px;
  }

  li:last-child {
    border-radius: 0 5px 5px 0;
  }

  .li-cur {
    background: #0894fa;
    color: #fff;
  }
}
// 表单盒子边距
.form-item-box {
  margin: 10px 0;
}

.form-checkbox {
  margin: 10px 100px;
}
// 子工作中心
.detailed-work-center {
  display: flex;

  .work-header {
    margin: 20px;
  }

  .table-work-header {
    flex: 1;
    // 表格按钮
    .table-btn {
      display: block;
      height: 30px;
      margin: 10px;
    }
  }
}
</style>
