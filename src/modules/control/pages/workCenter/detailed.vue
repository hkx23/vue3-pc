<template>
  <div class="detailed-box">
    <t-card class="list-card-detailed">
      <t-form
        ref="formRef"
        layout="inline"
        :data="formData"
        :show-cancel="true"
        :show-error-message="false"
        :rules="rules"
        @submit="onHandleSave"
      >
        <t-card :bordered="false">
          <header class="form-item-box">
            <t-form-item label="工作中心编号" name="wcCode">
              <t-input v-model="formData.wcCode" :disabled="props.disabledWord" />
            </t-form-item>
            <t-form-item label="所属车间" name="workshopID">
              <tm-select-business
                v-model="formData.workshopID"
                type="workshop"
                label-field="orgName"
                :show-title="false"
              ></tm-select-business
            ></t-form-item>
            <t-form-item label="地点" name="wcLocation">
              <t-input v-model="formData.wcLocation" style="width: 200px" />
            </t-form-item>
          </header>
          <div class="form-item-box">
            <t-form-item label="工作中心名称" name="wcName">
              <t-input v-model="formData.wcName" />
            </t-form-item>
            <t-form-item label="负责人" name="wcOwner">
              <t-input v-model="formData.wcOwner" style="width: 180px" />
            </t-form-item>
            <t-form-item label="顺序号" name="wcSeq">
              <t-input-number v-model="formData.wcSeq" theme="normal" style="width: 200px" />
            </t-form-item>
          </div>
          <t-form-item label="父级" name="parentWcId">
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
            <t-form-item label="类型" required-mark>
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
            <t-form-item label="关联设备" name="wcObjectId">
              <tm-select-business
                v-model="formData.wcObjectId"
                type="equipment"
                :disabled="typeShow"
                :show-title="false"
              >
              </tm-select-business>
            </t-form-item>
          </footer>
          <span class="form-checkbox">
            <t-checkbox v-model="formData.checked" @change="onCheCkbox">启用</t-checkbox>
          </span>
          <div class="table-btn">
            <t-button theme="default" @click="onHandleCancellation">取消</t-button>
            <t-button v-show="props.btnShow" type="submit">保存</t-button>
          </div>
        </t-card>

        <!-- table表格 -->
      </t-form></t-card
    >
    <!-- from -->
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/control';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';

const formRef: Ref<FormInstanceFunctions> = ref(null);
// 子修改传值
const total = ref(10);
const deleteVisible = ref(false);
const { pageUI } = usePage(); // 页面数
// const { loading, setLoading } = useLoading();
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
// const once = ref(0);
// const parentId = ref(); // 点击添加的时候存储父id
const typeShow = ref(false);
onMounted(() => {
  fetchData();
});
// const selectedRowKeys = ref([]); // 用于存储选中行的数组
// 首次请求
const fetchData = async () => {
  // 渲染表单页面
  Object.assign(formData, props.wordCenterId);
  console.log(formData.state);
  try {
    // setLoading(true);
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
    // const list = await api.workcenter.getCategory();
    // if (once.value === 0) {
    //   once.value = 1;
    //   typeData.value = list.list;
    //   typeData.value.forEach((item) => {
    //     item.show = false;
    //   });
    //   typeData.value[0].show = true;
    // }
    // 拿到渲染表单
    // console.log('props', props.wordCenterId);
    // 显示类型
    onTypeList();
    // 控制多选
  } catch (e) {
    console.log(e);
  } finally {
    // setLoading(false);
  }
};
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
  state: props.wordCenterId.state, // 启用还是禁用
  category: 0, // 获取设备关联
  wcObjectId: '', // 关联设备
  id: props.wordCenterId.id, // 父节点的id
  allRecord: [],
  wcSeq: 0, // 顺序号
});
// 类型数据数组
const typeData = ref([
  {
    wcType: '工作区',
    code: 0,
    id: 1,
    opId: 1,
    show: true,
  },
  {
    wcType: '生产线',
    code: 0,
    id: 2,
    opId: 2,
    show: false,
  },
  {
    wcType: '工段',
    code: 0,
    id: 3,
    opId: 3,
    show: false,
  },
  {
    wcType: '设备',
    code: 0,
    id: 4,
    opId: 4,
    show: false,
  },
]);
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
      formData.category = item.opId;
    } else {
      item.show = false;
    }
  });
  console.log(props.wordCenterId);

  console.log('激怒人', props.wordCenterId.state);
  console.log('激怒人2', formData.state);
  if (props.wordCenterId.state === 1) {
    formData.checked = true;
  } else {
    formData.checked = false;
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
      formData.category = item.opId;
    } else {
      item.show = false;
    }
  });
};
// 新增
const onWorkCenterAdd = async () => {
  try {
    const list = await api.workcenter.add({
      wcCode: formData.wcCode,
      wcName: formData.wcName,
      workshopId: formData.workshopID,
      parentWcId: formData.parentWcId,
      wcLocation: formData.wcLocation,
      wcObjectId: formData.wcObjectId,
      state: formData.state,
      wcOwner: formData.wcOwner,
      wcObjectType: formData.category,
      wcSeq: 0,
    });
    MessagePlugin.success('保存成功');
    Emit('addedShow', false);
    console.log(list, formData.parentWcId);
  } catch (e) {
    console.log(e);
  }
};
// 禁用和启用
const onCheCkbox = (checked: boolean) => {
  // 这个是新增
  if (!props.wordCenterId.children) {
    if (checked) {
      formData.state = 1;
    } else {
      formData.state = 0;
    }
    return;
  }
  // 这个是编辑
  const list = props.wordCenterId.children.every((item) => {
    return item.state === 0;
  });
  if (checked) {
    formData.state = 1;
  } else {
    if (!list) {
      MessagePlugin.error('子级是启用转态,无法禁用');
      return;
    }
    formData.state = 0;
  }
};
// 保存
const onHandleSave = async (context) => {
  if (context.validateResult === true && formData.category !== 0) {
    if (props.typeDetailed === 2) {
      // 子
      onWorkCenterAdd();
    }
    if (props.typeDetailed === 1) {
      // console.log('编辑');
      try {
        await api.workcenter.modify(formData);
        MessagePlugin.success('保存成功');
        Emit('addedShow', false);
      } catch (e) {
        console.log(e);
      }
    }
    // 新增
    if (props.typeDetailed === 3) {
      if (formData.parentWcId === '' || formData.parentWcId === undefined) {
        formData.parentWcId = '0';
      }
      // console.log('新增');
      onWorkCenterAdd();
    }
    if (props.typeDetailed === 4) {
      onWorkCenterAdd();
    }
  } else {
    MessagePlugin.error('必填字段,保存失败');
  }
};
// 取消
const onHandleCancellation = () => {
  deleteVisible.value = false;
  clearFrom();
  MessagePlugin.success('取消成功');
  Emit('addedShow', false);
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
  formData.category = 0; // 设备类型
  formData.state = 1; // 控制多选是选择状态
  formData.id = ''; // 父亲id
  formData.wcObjectId = ''; // 设备类型id
  formData.wcSeq = 0; // 默认为0
};
const rules: FormRules<Data> = {
  wcCode: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  workshopID: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  wcType: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  wcName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  wcSeq: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.list-card-detailed {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);
  padding-bottom: 50px;

  :deep(.t-card__body) {
    padding: 0;
  }
}

// .detailed-box {
//   padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
// }

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
  justify-content: space-between;

  .work-header {
    // margin: 20px 30px;
    // flex: 1;
    padding: 45px 0;
    width: 100px;
  }

  .table-work-header {
    width: 1200px;
    // 表格按钮
  }
}

.table-btn {
  position: absolute;
  // display: block;
  height: 30px;
  // margin: 10px 99px;
  right: 0;
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
