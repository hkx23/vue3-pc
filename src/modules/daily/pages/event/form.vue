<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    layout="inline"
    :show-error-message="true"
    :label-width="100"
  >
    <t-form-item :label="t('event.billNo')" name="billNo">
      <t-input v-model="formData.billNo" clearable :disabled="isFormEditing" />
    </t-form-item>
    <t-form-item :label="t('event.eventType')" name="eventType">
      <bcmp-select-param
        v-model="formData.eventType"
        placeholder="请选择事件类型"
        param-group="D_EVENT_TYPE"
      ></bcmp-select-param>
    </t-form-item>
    <t-form-item :label="t('event.eventSource')" name="eventSource">
      <bcmp-select-param
        v-model="formData.eventSource"
        placeholder="请选择事件来源"
        param-group="D_EVENT_SOURCE"
      ></bcmp-select-param>
    </t-form-item>
    <t-form-item :label="t('event.conferenceResponsibilityName')" name="conferenceResponsibilityId">
      <bcmp-select-business
        v-model="formData.conferenceResponsibilityId"
        type="conference"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('event.deptProposeName')" name="deptProposeId">
      <bcmp-select-business
        v-model="formData.deptProposeId"
        :disabled="isFormEditing"
        type="adminOrg"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('event.userProposeName')" name="userProposeId">
      <bcmp-select-business
        v-model="formData.userProposeId"
        :disabled="isFormEditing"
        type="user"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('event.datetimePropose')" name="datetimePropose">
      <t-date-picker
        v-model="formData.datetimePropose"
        :disabled="isFormEditing"
        enable-time-picker
        allow-input
        clearable
      />
    </t-form-item>
    <t-form-item :label="t('event.datetimePlanSolve')" name="datetimePlanSolve">
      <t-date-picker v-model="formData.datetimePlanSolve" enable-time-picker allow-input clearable />
    </t-form-item>
    <t-form-item :label="t('event.deptResponsibilityName')" name="deptResponsibilityId">
      <bcmp-select-business
        v-model="formData.deptResponsibilityId"
        type="adminOrg"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('event.userResponsibilityName')" name="userResponsibilityId">
      <bcmp-select-business
        v-model="formData.userResponsibilityId"
        :disabled="isFormEditing"
        type="user"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('event.handleStatus')" name="status">
      <bcmp-select-param
        v-model="formData.status"
        :disabled="!isFormEditing"
        placeholder="请选择处理状态"
        param-group="D_EVENT_STATUS"
      ></bcmp-select-param>
    </t-form-item>
    <t-form-item :label="t('event.importantDegree')" name="importantDegree">
      <bcmp-select-param
        v-model="formData.importantDegree"
        placeholder="请选择重要程度"
        param-group="D_IMPORTANT_DEGREE"
      ></bcmp-select-param>
    </t-form-item>
    <t-form-item :label="t('event.moShceCode')" name="moShceId">
      <bcmp-select-business v-model="formData.moShceId" type="moSchedule" :show-title="false"></bcmp-select-business>
    </t-form-item>
    <t-row>
      <t-col>
        <t-form-item :label="t('event.eventDesc')" name="eventDesc">
          <t-textarea v-model="formData.eventDesc" placeholder="请输入内容" />
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item :label="t('event.causeAnalysis')" name="causeAnalysis">
          <t-textarea v-model="formData.causeAnalysis" placeholder="请输入内容" />
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item :label="t('event.improveMeasure')" name="improveMeasure">
          <t-textarea v-model="formData.improveMeasure" placeholder="请输入内容" />
        </t-form-item>
      </t-col>
    </t-row>

    <bcmp-upload-content
      ref="uploadContentRef"
      ghost
      :upload-path="uploadPath"
      :file-list="formData.fileList"
      :is-hand-delete="isFormEditing"
      @delete-success="deleteSuccess"
      @batch-delete-success="batchDeleteSuccess"
    >
      <template #title> 附件/图片 </template>
    </bcmp-upload-content>

    <!-- 
    <t-form-item :label="t('role.roleName')" name="roleName">
      <t-input v-model="formData.roleName" clearable />
    </t-form-item>
    <t-form-item :label="t('role.eId')" name="eid">
      <bcmp-select-business
        v-model="formData.eid"
        type="enterprise"
        :disabled="!isAdmin"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('role.org')" name="oid">
      <bcmp-select-business
        v-model="formData.oid"
        type="plant"
        :parent-id="formData.eid"
        :disabled="!isAdmin"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('role.roleDesc')" name="roleDesc">
      <t-textarea v-model="formData.roleDesc" clearable />
    </t-form-item> -->
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'RoleForm',
};
</script>
<script setup lang="ts">
import dayjs from 'dayjs';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import { api, EventDTO } from '@/api/daily';
import { useUserStore } from '@/store/modules/user';
import commmon from '@/utils/common';

// import { useUserStore } from '@/store';
import { FormRef } from './constants';
import { useLang } from './lang';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const { t } = useLang();
// const user = useUserStore();
const formData: EventDTO = reactive({
  billNo: '',
});
const uploadContentRef = ref();
const uploadPath = ref('daily/event');
// 校验代码是否存在一样，如果一样校验失败
// 自定义校验函数，调用自定义 API 并返回校验结果
// const checkSameCode = async (val) => {
//   try {
//     const responseData = await api.event.getItemByCode({ id: formData.id, roleCode: formData.roleCode });
//     // 根据实际需求在这里进行校验，并返回 true 或 false
//     if (Number(responseData) > 0) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false; // 如果发生错误，则返回失败
//   }
// };

// const checkSameName = async (val) => {
//   try {
//     const responseData = await api.role.getItemByName({ id: formData.id, roleName: formData.roleName });
//     // 根据实际需求在这里进行校验，并返回 true 或 false
//     if (Number(responseData) > 0) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false; // 如果发生错误，则返回失败
//   }
// };

const formRef: Ref<FormInstanceFunctions> = ref(null);
const deleteFileList = ref([]);
const FORM_RULES = {
  // roleCode: [
  //   { required: true, message: t('common.placeholder.input', [t('role.roleCode')]) },
  //   { validator: checkSameCode, message: t('role.checkCode') },
  // ],
  // roleName: [
  //   { required: true, message: t('common.placeholder.input', [t('role.roleName')]) },
  //   { validator: checkSameName, message: t('role.checkName') },
  // ],
  eventType: [{ required: true, message: t('common.placeholder.select', [t('event.eventType')]) }],
  deptProposeId: [{ required: true, message: t('common.placeholder.select', [t('event.deptProposeName')]) }],
  userProposeId: [{ required: true, message: t('common.placeholder.select', [t('event.userProposeName')]) }],
  datetimePropose: [{ required: true, message: t('common.placeholder.select', [t('event.datetimePropose')]) }],
  deptResponsibilityId: [{ required: true, message: t('common.placeholder.select', [t('event.deptProposeName')]) }],
  userResponsibilityId: [
    { required: true, message: t('common.placeholder.select', [t('event.userResponsibilityName')]) },
  ],
  status: [{ required: true, message: t('common.placeholder.select', [t('event.handleStatus')]) }],
  eid: [{ required: true, message: t('common.placeholder.select', [t('role.eId')]) }],
  oid: [{ required: true, message: t('common.placeholder.select', [t('role.org')]) }],
};

const submit = async () => {
  formData.fileList = uploadContentRef.value.getFileList();
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (isFormEditing) {
        api.event.edit(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      formData.fileList = uploadContentRef.value.getFileList();
      api.event.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
// let isAdmin = false;
let isFormEditing = false;
const reset = (isEdit: boolean, data?: Event) => {
  // isAdmin = false;
  formRef.value.reset({ type: 'empty' });

  formData.id = '';
  formData.oid = '';
  formData.eid = '';
  formData.fileList = [];
  // 将id小写后比较
  if (!isEdit) {
    formData.id = commmon.generateBigIntId().toString();
    formData.eid = fw.getEnterpriseId();
    formData.oid = fw.getOrgId();
    formData.eventSource = 'EVENT';
    formData.datetimePropose = dayjs().format('YYYY-MM-DD HH:mm:ss');
    formData.userProposeId = userInfo.value.id;
    formData.deptProposeId = userInfo.value.adminOrgId;
    formData.status = 'CREATED';
  }

  isFormEditing = isEdit;
  if (data) {
    if (isEdit) {
      Object.assign(formData, data);
    }
  }
  uploadPath.value = `daily/event/${formData.id}`;
  formRef.value.clearValidate();
};

const deleteSuccess = (file: any) => {
  // MessagePlugin.info(
  //   `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  deleteFileList.value.push(file);
  console.log('deleteSuccess', file);
};

const batchDeleteSuccess = (files: any[]) => {
  // MessagePlugin.info(
  //   `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  deleteFileList.value.push(...files);
  console.log('batchDeleteSuccess', files);
};

defineExpose({
  form: formRef,
  submit,
  reset,
} as FormRef);
</script>

<style lang="less" scoped>
.t-form-inline {
  row-gap: 20px;
}

:deep(.t-form__controls-content) {
  width: 200px !important;

  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 200px;
  }
}
</style>
`
