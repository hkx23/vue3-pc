<template>
  <div class="detailed-box">
    <!-- from -->
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false">
      <t-card :bordered="false">
        <header class="form-item-box">
          <t-form-item label="工作中心编号">
            <t-input v-model="formData.wcCode" :disabled="props.disabledWord" />
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
            <t-input v-model="formData.wcOwner" style="width: 180px" />
          </t-form-item>
        </div>
        <t-form-item label="父级">
          <tm-select-business
            v-model="formData.parentWcId"
            type="workcenter"
            :disabled="props.disabledParent"
            :show-title="false"
          >
          </tm-select-business>
          <!-- <t-select v-model="formData.parentWcCode" /> -->
        </t-form-item>
        <footer class="form-item-box">
          <t-form-item label="类型">
            <ul class="type-box">
              <li
                v-for="item in typeData"
                :key="item.id"
                :class="item.show ? 'li-cur' : ''"
                @click="onHandleCur(item.wcType)"
              >
                {{ item.wcType }}
              </li>
            </ul>
          </t-form-item>
          <t-form-item label="关联设备">
            <tm-select-business v-model="formData.wcObjectId" type="equipment" :disabled="typeShow" :show-title="false">
            </tm-select-business>
          </t-form-item>
        </footer>
        <span class="form-checkbox">
          <t-checkbox v-model="formData.checked">启用</t-checkbox>
        </span>
        <div style="margin: 10px 100px">
          <t-button theme="default" type="submit" :disabled="props.btnShowDisable.add" @click="onHandelAdd"
            >添加</t-button
          >
          <t-button theme="default" :disabled="props.btnShowDisable.delete" @click="onHandelRemove">删除</t-button>
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
          :show-pagination="props.typeDetailed === 3 ? true : false"
          :total="total"
          drag-sort="row"
          row-key="id"
          :table-column="columns"
          :table-data="workData"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @select-change="rehandleSelectChange"
          @refresh="fetchData"
          @drag-sort="onDragSort"
        >
          <template #sequence>
            <div>1</div>
          </template>
          <template #wcCode="{ row }">
            <div>
              <t-icon name="chevron-right"></t-icon>
              <t-link theme="primary" underline @click="onHandelCode(row)">{{ row.wcCode }}</t-link>
            </div>
          </template>
        </tm-table>
        <span class="table-btn">
          <t-button v-show="props.btnShow" @click="onHandleSave">保存</t-button>
          <t-button theme="default" @click="onHandleCancellation">取消</t-button></span
        >
        <t-dialog v-model:visible="deleteVisible" header="提示" :cancel-btn="null" :confirm-btn="null" width="40%">
          <div class="delete-box">
            {{ childrenTotal > 0 ? '当前删除的工作中心下有子工作中心确认删除吗' : '确认删除吗' }}
          </div>
          <div class="control-box">
            <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
            <t-button theme="primary" type="submit" @click="onSecondary">确认</t-button>
          </div></t-dialog
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
const total = ref(10);
// 拖拽
const onDragSort = (params) => {
  console.log('交换行', params);
  console.log('交换行', params.data);
  console.log('交换行', params.newData);
  formData.allRecord = params.newData;
  // api.workcenter.modify2({ allRecord: formData.allRecord });
  workData.value = params.newData;
  // console.log(params);
  // api.workcenter.modify2(params.target);
  // fetchData();
};
const childrenTotal = ref();
const deleteVisible = ref(false);
const { pageUI } = usePage(); // 页面数
const { loading, setLoading } = useLoading();
const Emit = defineEmits(['addedShow', 'FormClear', 'ChildDefault', 'delete']); // addedShow窗口
const props = defineProps({
  btnShowDisable: {
    type: Object,
  },
  wordCenterId: {
    type: Object,
  },
  nextArr: {
    type: String,
  },
  btnShow: {
    type: Boolean,
  },
  typeDetailed: {
    type: Number,
  },
  disabledWord: {
    type: Boolean,
    default: false,
  },
  disabledParent: {
    type: Boolean,
    default: false,
  },
  newArr: {
    type: String,
  },
});
const once = ref(0);
const parentId = ref(); // 点击添加的时候存储父id
const typeShow = ref(false);
onMounted(() => {
  fetchData();
});
const selectedRowKeys = ref([]); // 用于存储选中行的数组
// 首次请求
const fetchData = async () => {
  // 渲染表单页面
  Object.assign(formData, props.wordCenterId);
  try {
    setLoading(true);
    // 子节点请求
    const res = await api.workcenter.getChildCenter({
      id: props.wordCenterId.id,
      category: formData.category,
    });
    workData.value = res.list;
    if (props.typeDetailed === 3) {
      clearFrom();
      // 点击新增渲染数据
      const list = await api.workcenter.getlist({
        pageNum: pageUI.value.page,
        pageSize: pageUI.value.rows,
        // category: formData.wcType,
      });
      workData.value = list.list;
      total.value = list.total;
    }
    // 判断数组是否小于1禁用删除
    if (workData.value.length < 1) {
      Emit('delete', true);
    }
    // 拿到数组
    const list = await api.workcenter.getCategory();
    if (once.value === 0) {
      once.value = 1;
      typeData.value = list.list;
      typeData.value.forEach((item) => {
        item.show = false;
      });
      typeData.value[0].show = true;
    }
    // 拿到渲染表单
    // console.log('props', props.wordCenterId);
    // 显示类型
    onTypeList();
    // 控制多选
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// table类型数据
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
    colKey: 'wcType',
    title: '关联设备',
    align: 'center',
  },
  {
    colKey: 'wcOwner',
    title: '负责人',
    align: 'center',
    fixed: 'right',
  },
];
// 存在渲染数据数组
const workData = ref([]);
// 绑定form
const formData = reactive({
  wcCode: '', // 工作中心编号
  wcName: '', // 工作中心名称
  wcLocation: '', // 地点
  workshopID: '', // 所属车间
  wcOwner: '', // 负责人
  parentWcId: '', // 父级
  checked: true, // 多选控制 默认为选中
  wcType: '', // 设备类型
  state: 1, // 启用还是禁用
  category: '', // 获取设备关联
  wcObjectId: '', // 关联设备
  id: props.wordCenterId.id, // 父节点的id
  allRecord: [],
});
// 类型数据数组
const typeData = ref([]);
// 判断数组里面的设备
const onTypeList = () => {
  typeData.value.forEach((item) => {
    // 判断名称是否相同
    if (props.newArr === item.wcType) {
      // 判断是否为设备
      if (props.newArr !== '设备') {
        typeShow.value = true;
      }
      item.show = true;
      formData.category = item.wcType;
    } else {
      item.show = false;
    }
  });
  if (formData.state === 1) {
    formData.checked = true;
  } else {
    formData.checked = false;
  }
};
// 点击进入发请求进子集
const onHandelCode = async (row) => {
  // typeShow.value = true;
  Emit('ChildDefault', true);
  try {
    setLoading(true);
    console.log(formData.category);
    const res = await api.workcenter.getChildCenter({
      id: row.id,
      category: formData.category,
    });
    formData.id = row.id;
    workData.value = res.list;
    workData.value.forEach((item) => {
      formData.workshopID = item.workshopId;
    });
    Object.assign(formData, row);
    onTypeList();
    // 判断数组是否为0删除禁用
    if (workData.value.length < 1) {
      Emit('delete', true);
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 类型高亮事件
const onHandleCur = (all) => {
  typeData.value.forEach((item) => {
    if (item.wcType === all) {
      if (item.wcType !== '设备') {
        // console.log(1230);
        formData.wcObjectId = '';
        typeShow.value = true;
      } else {
        typeShow.value = false;
      }
      item.show = true;
      formData.category = item.wcType;
    } else {
      item.show = false;
    }
  });
};
// checked事件
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
};
// 新增
const onWorkCenterAdd = async () => {
  try {
    await api.workcenter.add({
      wcCode: formData.wcCode,
      wcName: formData.wcName,
      workshopID: formData.workshopID,
      parentWcId: formData.parentWcId,
      wcLocation: formData.wcLocation,
      wcObjectId: formData.wcObjectId,
      state: formData.state,
      wcOwner: formData.wcOwner,
      wcType: formData.category,
      wcSeq: 0,
    });
  } catch (e) {
    console.log(e);
  }
};
// 删除
const onHandelRemove = async () => {
  // deleteVisible.value = true;
  if (selectedRowKeys.value.length < 1) {
    MessagePlugin.error('请选择要删除的');
    return;
  }
  const children = await api.workcenter.haveChildCenter({ ids: selectedRowKeys.value });
  childrenTotal.value = children.total;
  deleteVisible.value = true;
  // await api.workcenter.remove({ ids: selectedRowKeys.value });
  // MessagePlugin.success('删除成功');
};
// 确认删除
const onSecondary = async () => {
  try {
    await api.workcenter.remove({ ids: selectedRowKeys.value });
    deleteVisible.value = false;
    MessagePlugin.success('删除成功');
    fetchData();
  } catch (e) {
    console.log(e);
  }
};
// 取消
const onSecondaryReset = () => {
  deleteVisible.value = false;
};
// 保存
const onHandleSave = async () => {
  if (props.typeDetailed === 2) {
    // 子
    onWorkCenterAdd();
  }
  if (props.typeDetailed === 1) {
    // console.log('编辑');
    try {
      api.workcenter.modify(formData);
    } catch (e) {
      console.log(e);
    }
  }
  // 新增
  if (props.typeDetailed === 3) {
    // console.log('新增');
    onWorkCenterAdd();
  }
  MessagePlugin.success('保存成功');
  Emit('addedShow', false);
};
// 取消
const onHandleCancellation = () => {
  deleteVisible.value = false;
  clearFrom();
  MessagePlugin.success('取消成功');
  Emit('addedShow', false);
};
// 添加状态
const onHandelAdd = async () => {
  if (props.typeDetailed === 2) {
    parentId.value = formData.id;
    clearFrom();
    formData.parentWcId = parentId.value;
    typeData.value.forEach((item) => {
      item.show = false;
    });
    // typeShow.value = false;
    Emit('FormClear', false);
  }
};
// 清空表单
const clearFrom = () => {
  formData.wcCode = ''; // 工作中心编号
  formData.wcName = ''; // 工作中心名称
  formData.wcLocation = ''; // 地点
  formData.workshopID = ''; // 所属车间
  formData.wcOwner = ''; // 负责人
  formData.parentWcId = ''; // 父级
  formData.checked = true; // 多选
  formData.wcType = ''; // 设备类型
  formData.category = ''; // 设备类型
  formData.state = 1; // 控制多选是选择状态
  formData.id = ''; // 父亲id
  formData.wcObjectId = ''; // 设备类型id
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

.delete-box {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
}

.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}
</style>
