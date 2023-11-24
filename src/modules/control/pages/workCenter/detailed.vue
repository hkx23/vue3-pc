<template>
  <div class="detailed-box">
    <!-- from -->
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
      <t-card :bordered="false">
        <header class="form-item-box">
          <t-form-item label="工作中心编号">
            <t-input v-model="formData.workNumber" />
          </t-form-item>
          <t-form-item label="所属车间">
            <tm-select-business v-model="formData.workShop" type="workshop" :show-title="false"></tm-select-business
          ></t-form-item>
          <t-form-item label="地点">
            <t-input v-model="formData.location" style="width: 200px" />
          </t-form-item>
        </header>
        <div class="form-item-box">
          <t-form-item label="工作中心名称">
            <t-input v-model="formData.workName" />
          </t-form-item>
          <t-form-item label="负责人">
            <t-input v-model="formData.head" style="width: 180px" />
          </t-form-item>
        </div>
        <t-form-item label="父级">
          <t-select v-model="formData.parent" />
        </t-form-item>
        <footer class="form-item-box">
          <t-form-item label="类型">
            <ul class="type-box">
              <li
                v-for="item in typeData"
                :key="item.id"
                :class="item.show ? 'li-cur' : ''"
                @click="onHandleCur(item.id)"
              >
                {{ item.name }}
              </li>
            </ul>
          </t-form-item>
          <t-form-item label="关联设备">
            <t-select></t-select>
          </t-form-item>
        </footer>
        <span class="form-checkbox">
          <t-checkbox v-model="checked">启用</t-checkbox>
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
          row-key="name"
          :table-column="columns"
          :table-data="workData"
          :total="total"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @select-change="rehandleSelectChange"
          @refresh="fetchData"
        >
          <!-- <template #expandedRow="{ row }">
            <div>{{ row }}</div>
          </template> -->
          <template #sequence>
            <div>1</div>
          </template>
          <template #Work-center-number>
            <div>
              <t-icon name="chevron-right"></t-icon>
              <t-link theme="primary" underline> 0752-A01-WCO1 </t-link>
            </div>
          </template>
          <template #parentWorkCenter>
            <div>11</div>
          </template>
          <template #associated>
            <span>PE30332705-2 </span>
          </template>
          <!-- </t-table> -->
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
import { onMounted, ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
// 子修改传值
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const total = ref(10); // 总页数
const checked = ref(false); // 多选框控件
const Emit = defineEmits(['addedShow']); // addedShow窗口
const props = defineProps({
  btnShow: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  fetchData();
});
const selectedRowKeys = ref([]); // 用于存储选中行的数组
const fetchData = async () => {
  setLoading(true);
  setTimeout(() => {
    workData.value = _.cloneDeep(workData.value);
    setLoading(false);
  }, 500);
};
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'sequence',
    title: '顺序号',
    align: 'center',
  },
  {
    colKey: 'Work-center-number',
    title: '工作中心编号',
    align: 'center',
  },
  {
    colKey: 'name',
    title: '名称',
    align: 'center',
  },
  {
    colKey: 'types',
    title: '类型',
    align: 'center',
  },
  {
    colKey: 'location',
    title: '地点',
    align: 'center',
  },
  {
    colKey: 'associated',
    title: '关联设备',
    align: 'center',
  },
  {
    colKey: 'head',
    title: '负责人',
    align: 'center',
  },
];
const workData = ref([
  {
    name: ['你好2'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
  {
    name: ['你好1'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
  {
    name: ['你好3'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
]);
const formData = ref({
  workNumber: '', // 工作中心编号
  workName: '', // 工作中心名称
  location: '', // 地点
  workShop: '', // 所属车间
  head: '', // 负责人
  parent: '', // 父级
});
const typeData = ref([
  {
    id: 1,
    name: '工作区',
    show: true,
  },
  {
    id: 2,
    name: '生产线',
    show: false,
  },
  {
    id: 3,
    name: '工段',
    show: false,
  },
  {
    id: 4,
    name: '设备',
    show: false,
  },
]);

// 高亮事件
const onHandleCur = (id: number) => {
  typeData.value.forEach((item) => {
    if (item.id === id) {
      item.show = true;
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
  MessagePlugin.success('保存成功');
  Emit('addedShow', false);
};
// 取消
const onHandleCancellation = () => {
  MessagePlugin.success('取消成功');
  Emit('addedShow', false);
};

const submit = () => {
  console.log(1);
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
