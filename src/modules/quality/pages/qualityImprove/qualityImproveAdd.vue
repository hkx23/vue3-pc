<template>
  <cmp-container :full="true">
    <!-- !提交暂存模块 -->
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col>
          <t-button @click="onSubmit">提交</t-button>
          <t-button theme="default" @click="onStaging">暂存</t-button>
          <t-button theme="default" @click="onClose">关闭</t-button>
        </t-col>
      </t-row>
    </cmp-card>
    <t-tabs v-model="tagValue">
      <t-tab-panel :value="0" label="标准" :destroy-on-hide="false">
        <template #panel>
          <!-- !基础信息模块 -->
          <cmp-container :full="true" style="margin-top: 14px">
            <cmp-card :hover-shadow="false">
              <t-row style="margin-left: 26px" justify="space-between" align="center">
                <t-col>
                  <span class="span_title">{{ t('qualityImprove.baseInfo') }}：</span>
                  <span>{{ formData.billNo }}</span>
                </t-col>
              </t-row>
              <t-form
                ref="formRef"
                :rules="rules"
                :data="formData"
                :show-error-message="false"
                style="margin-top: 10px"
              >
                <t-row :gutter="[32, 16]">
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.inspectionType')" label-align="right" name="inspectType">
                      <t-select v-model="formData.inspectType" clearable style="width: 200px">
                        <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.relateBillNo')" label-align="right" name="relateBillNo">
                      <t-select v-model="formData.relateBillNo" clearable style="width: 200px">
                        <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.mitemCode')" label-align="right" name="mitemCode">
                      <t-input v-model="formData.mitemCode" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <!-- 第 2️⃣ 行数据 -->
                  <t-col :span="4">
                    <t-form-item :label="t('business.main.mitemDesc')" label-align="right" name="mitemDesc">
                      <t-select v-model="formData.mitemDesc" clearable style="width: 200px" :disabled="true">
                        <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.supplierCode')" label-align="right" name="supplierCode">
                      <t-input v-model="formData.supplierCode" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.supplierName')" label-align="right" name="supplierName">
                      <t-input v-model="formData.supplierName" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('business.main.workshop')" label-align="right" name="workshopName">
                      <t-input v-model="formData.workshopName" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('business.main.workcenter')" label-align="right" name="workcenterName">
                      <t-input v-model="formData.workcenterName" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.moScheCode')" label-align="right" name="scheCode">
                      <t-input v-model="formData.scheCode" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.defectCode')" label-align="right" name="defectCode">
                      <t-input v-model="formData.defectCode" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.defectCategory')" label-align="right" name="defectCategory">
                      <t-input v-model="formData.defectCategory" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.handleMethod')" label-align="right" name="handleMethod">
                      <t-input v-model="formData.handleMethod" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item
                      :label="t('qualityImprove.deptResponsibility')"
                      label-align="right"
                      name="deptResponsibilityName"
                    >
                      <t-input v-model="formData.deptResponsibilityName" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>

                  <t-col :span="4">
                    <t-form-item
                      :label="t('qualityImprove.personResponsibility')"
                      label-align="right"
                      name="personResponsibilityName"
                    >
                      <t-input v-model="formData.personResponsibilityName" style="width: 200px" :disabled="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.occurNature')" label-align="right" name="occurNature">
                      <t-select v-model="formData.occurNature" clearable style="width: 200px">
                        <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.isBatch')" label-align="right" name="isBatch">
                      <t-select v-model="formData.isBatch" :clearable="true" style="width: 200px">
                        <t-option key="0" :label="t('business.main.yes')" value="1" />
                        <t-option key="1" :label="t('business.main.no')" value="0" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item
                      :label="t('qualityImprove.userResponsibility')"
                      label-align="right"
                      name="userResponsibilityName"
                    >
                      <bcmp-select-business
                        v-model="formData.userResponsibilityName"
                        type="user"
                        :show-title="false"
                        style="width: 200px"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item
                      :label="t('qualityImprove.datetimeRequireFinish')"
                      label-align="right"
                      name="datetimeRequireFinish"
                    >
                      <t-input v-model="formData.datetimeRequireFinish" style="width: 200px" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item :label="t('qualityImprove.improveTool')" label-align="right" name="improveTool">
                      <t-select v-model="formData.improveTool" style="width: 200px">
                        <t-option key="PDCA" label="PDCA" value="PDCA" />
                        <t-option key="8D" label="8D" value="8D" />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="11">
                    <t-form-item :label="t('qualityImprove.problemDesc')" label-align="right" name="problemDesc">
                      <t-input v-model="formData.problemDesc" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="11">
                    <t-form-item :label="t('qualityImprove.problemDescAdd')" label-align="right" name="problemDescAdd">
                      <t-textarea
                        v-model="formData.problemDescAdd"
                        :placeholder="t('common.placeholder.input')"
                        autosize
                      />
                    </t-form-item>
                  </t-col>
                  <!-- 第 4️⃣ 行数据 -->
                  <t-col :span="4">
                    <t-form-item label="附件：" name="mitemCode">
                      <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
                    </t-form-item>
                  </t-col>
                </t-row>
              </t-form>
            </cmp-card>
          </cmp-container>
        </template>
      </t-tab-panel>
      <t-tab-panel :value="1" label="标准分配" :destroy-on-hide="false">
        <template #panel>
          <cmp-container :full="true">
            <cmp-card :ghost="true" class="padding-top-noline-16">
              <cmp-table v-model:pagination="pageUI" row-key="id" select-on-row-click :fixed-height="true"> </cmp-table>
            </cmp-card>
          </cmp-container>
        </template>
      </t-tab-panel>
    </t-tabs>
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    width="40%"
    :confirm-btn="fileList.length >= 1 ? '确认' : null"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        :is-hand-delete="true"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
// import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const tagValue = ref(0);
const { pageUI } = usePage(); // 分页工具
const formRef = ref(null);
const formVisible = ref(false);
const dataTotal = ref(0);
const dtlRowKeys: Ref<any[]> = ref([]);
const perId = ref('');

const getDtlByStdId = async () => {
  const res = await apiQuality.oqcInspectStdDtl.getAllDtlByStdId({
    stdId: formData.value.id,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableData.value = res.list.map((item, index) => ({ ...item, index }));
  dataTotal.value = res.total;
  dtlRowKeys.value = [];
};

const formData = ref({
  operateTpye: 'add',
  billNo: '',
  relateBillNo: '',
  id: '',
  inspectType: '',
  deptResponsibilityName: '',
  improveTool: '',
  defectCode: '',
  handleMethod: '',
  supplierCode: '',
  workcenterName: '',
  mitemCode: '',
  mitemDesc: '',
  workshopName: '',
  scheCode: '',
  supplierName: '',
  personResponsibilityName: '',
  userResponsibilityName: '',
  occurNature: '',
  defectCategory: '',
  problemDescAdd: '',
  problemDesc: '',
  datetimeRequireFinish: '',
  isBatch: '',
});
const init = () => {
  fileList.value = [];
  tableData.value = [];
  dataTotal.value = 0;
};
const statusOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_IQC_INSPECTION_TYPE' }).then((data) => {
  statusOption.value = data;
});

const submit = async () => {
  try {
    // if (isEmpty(formData.value.inspectStdCode)) {
    //   MessagePlugin.error('请输入标准编码');
    //   return false;
    // }
    // if (isEmpty(formData.value.inspectStdName)) {
    //   MessagePlugin.error('请输入标准名称');
    //   return false;
    // }
    // if (isEmpty(formData.value.timeEffective)) {
    //   MessagePlugin.error('请选择生效时间');
    //   return false;
    // }
    // if (isEmpty(formData.value.timeInvalid)) {
    //   MessagePlugin.error('请选择失效时间');
    //   return false;
    // }
    // if (isEmpty(formData.value.inspectTypeList)) {
    //   MessagePlugin.error('请选择检验类型');
    //   return false;
    // }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
const onConfirmFile = () => {
  formVisible.value = false;
};

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onStaging = async () => {
  const data = await submit();
  if (data) {
    Emit('permissionShow', false); // 回到父
  }
};
const onSubmit = async () => {
  const data = await submit();
  if (data) {
    Emit('permissionShow', false); // 回到父
  }
};
const onClose = async () => {
  if (formData.value.operateTpye !== 'add') {
    await apiQuality.oqcInspectStd.delById([formData.value.id]);
  }
  Emit('permissionShow', false); // 回到父
};

// // 上传文件
const fileList = ref([]);

const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(`上文件成功`);
  fileList.value.push(file);
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:140 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('deleteSuccess', file);
  fileList.value = fileList.value.filter((item) => item.signedUrl !== file.signedUrl);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(`删除多个文件成功`);
  console.log('batchDeleteSuccess', files);
  files.forEach((item) => {
    fileList.value = fileList.value.filter((file) => file.signedUrl !== item.signedUrl);
  });
};

const tableData = ref([]);

// #表单定义规则
const rules: FormRules = {
  inspectStdCode: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemSeq: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectStdName: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeEffective: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeInvalid: [{ required: true, message: '不能为空', trigger: 'change' }],
  status: [{ required: true, message: '不能为空', trigger: 'change' }],
  revision: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemName: [{ required: true, message: '不能为空', trigger: 'change' }],
  characteristics: [{ required: true, message: '不能为空', trigger: 'change' }],
  samplingStandardType: [{ required: true, message: '不能为空', trigger: 'change' }],
  samplingStandardCode: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectTool: [{ required: true, message: '不能为空', trigger: 'change' }],
  unqualifyCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectBasis: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectTypeList: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectProperty: [{ required: true, message: '不能为空', trigger: 'change' }],
};

defineExpose({
  form: formRef,
  dtlRowKeys,
  formData,
  getDtlByStdId,
  init,
  perId,
  fileList,
});
</script>

<style lang="less" scoped>
.cards_title {
  :deep(.t-card__title) {
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
  }
}

.tag-item {
  margin-right: 8px; /* 控制标签之间的间距 */
  align-items: center; /* 垂直居中 */
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
