<template>
  <cmp-container>
    <cmp-card>
      <t-form
        layout="inline"
        :data="formData"
        :show-cancel="true"
        label-align="right"
        label-width="100px"
        :rules="rules"
        :show-error-message="false"
        @submit="submit"
      >
        <t-row :gutter="[12, 12]">
          <t-col :span="4">
            <t-form-item label="标准编码" label-align="right" name="inspectStdCode">
              <t-input v-model="formData.inspectStdCode" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="标准名称" label-align="right" name="inspectStdName">
              <t-input v-model="formData.inspectStdName" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="版本号" label-align="right" name="revision">
              <t-input v-model="formData.revision" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="状态" label-align="right" name="status">
              <t-select v-model="formData.status" clearable style="width: 200px" :disabled="true">
                <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="集团检验标准" label-align="right" name="groupInspectStdId">
              <t-input v-model="formData.groupInspectStdId" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="生效时间" label-align="right" name="timeEffective">
              <t-date-picker v-model="formData.timeEffective" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="失效时间" label-align="right" name="timeInvalid">
              <t-date-picker v-model="formData.timeInvalid" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="检验类型" label-align="right" name="inspectTypeList">
              <t-select v-model="formData.inspectTypeList" multiple clearable style="width: 200px">
                <t-option v-for="(item, index) in stdTypeOption" :key="index" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="附件" label-align="right" name="attachement">
              <t-link theme="primary">上传附件</t-link>
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="index"
        :table-column="tableStdDtlColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :selected-row-keys="dtlRowKeys"
        select-on-row-click
        :fixed-height="true"
        style="height: 200px"
        @select-change="onDtlSelectedChange"
        @refresh="onRefresh"
      >
        <template #title>标准明细</template>
        <template #button>
          <t-button theme="primary" @click="onAdd">新增</t-button>
          <t-button theme="default" :disabled="dtlRowKeys.length < 1" @click="onDelDtlData">删除</t-button>
        </template>
        <template #inspectTypeListOp="{ row }">
          <t-row>
            <div v-for="(type, index) in row.inspectTypeList" :key="index" class="tag-item">
              <t-tag theme="primary">{{ getLabelByValue(type) }}</t-tag>
            </div>
          </t-row>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" :header="diaLogTitle" width="90%" :on-confirm="onConfirmDtl">
    <t-form
      ref="formRef"
      :data="dtlData"
      :rules="rules"
      :show-error-message="true"
      :show-cancel="true"
      label-align="right"
      label-width="120px"
    >
      <t-row :gutter="[12, 12]">
        <t-col :span="4">
          <t-form-item label="项目名称" label-align="right" name="itemName">
            <t-input v-model="dtlData.itemName" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="项目类别" label-align="right" name="itemCategory">
            <t-select v-model="dtlData.itemCategory" clearable style="width: 280px">
              <t-option v-for="item in categoryOption" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="项目行号" label-align="right" name="itemSeq">
            <t-input v-model="dtlData.itemSeq" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="抽样标准类型" label-align="right" name="samplingStandardType">
            <t-radio-group v-model="dtlData.samplingStandardType" default-value="1">
              <t-radio value="1">国标</t-radio>
              <t-radio value="2">企标</t-radio>
            </t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="抽样标准" label-align="right" name="samplingStandardCode">
            <t-select
              v-model="dtlData.samplingStandardCode"
              clearable
              filterable
              input-props
              @clear="fetchSampingStdCodes"
              @input-change="querySelectChange($event)"
            >
              <t-option
                v-for="item in codesOption"
                :key="item.id"
                :label="item.label"
                :value="item.value"
                :lazy-load="true"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="项目特性" label-align="right" name="characteristics">
            <t-select v-model="dtlData.characteristics" clearable style="width: 280px">
              <t-option
                v-for="(item, index) in characteristicsOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="不合格分类" label-align="right" name="unqualifyCategory">
            <t-select v-model="dtlData.unqualifyCategory" clearable style="width: 280px">
              <t-option v-for="item in unCategoryOption" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="检验类型" label-align="right" name="inspectTypeList">
            <t-select v-model="dtlData.inspectTypeList" clearable multiple style="width: 280px">
              <t-option v-for="(item, index) in stdTypeOption" :key="index" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="检验属性" label-align="right" name="inspectProperty">
            <t-select v-model="dtlData.inspectProperty" clearable style="width: 280px">
              <t-option v-for="item in propertyOption" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="检验工具" label-align="right" name="inspectTool">
            <t-input v-model="dtlData.inspectTool" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item
            label="检验水平"
            label-align="right"
            name="inspectLevel"
            :required-mark="dtlData.samplingStandardType === '1'"
          >
            <t-select
              v-model="dtlData.inspectLevel"
              clearable
              style="width: 280px"
              :disabled="dtlData.samplingStandardType !== '1'"
            >
              <t-option v-for="item in levelOption" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="检验依据" label-align="right" name="inspectBasis">
            <t-input v-model="dtlData.inspectBasis" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="工序" label-align="right" name="processId">
            <bcmp-select-business v-model="dtlData.processId" type="process" :show-title="false"></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="技术要求" label-align="right" name="technicalRequest">
            <t-input v-model="dtlData.technicalRequest" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="最小值" label-align="right" name="minValue">
            <t-input v-model="dtlData.minValue" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="最大值" label-align="right" name="maxValue">
            <t-input v-model="dtlData.maxValue" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="基准值" label-align="right" name="baseValue">
            <t-input v-model="dtlData.baseValue" style="width: 280px" />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="单位" label-align="right" name="uom">
            <bcmp-select-business
              v-model="dtlData.uom"
              type="uom"
              :show-title="false"
              value-field="uom"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="附件" label-align="right" name="attachement">
            <t-link theme="primary">上传附件</t-link>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
  </t-dialog>
</template>
<script lang="ts">
import { isEmpty } from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, Ref, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

export default {
  name: 'MitemForm',
  setup() {
    const formData = ref({
      operateTpye: 'add',
      saveTpye: 'add',
      id: '',
      inspectStdCode: '',
      inspectStdName: '',
      groupInspectStdId: '',
      revision: null,
      timeEffective: '',
      timeInvalid: '',
      status: '',
      inspectTypeList: [],
    });
    const dtlData = ref({
      itemSeq: '',
      itemCategory: '',
      itemName: '',
      characteristics: 0,
      baseValue: '',
      maxValue: '',
      minValue: '',
      technicalRequest: '',
      uom: '',
      uomName: '',
      samplingStandardType: '',
      samplingStandardCode: '',
      inspectLevel: '',
      inspectLevelName: '',
      inspectTool: '',
      unqualifyCategory: '',
      inspectBasis: '',
      inspectTypeList: [],
      inspectProperty: '',
      processId: '',
    });
    const dtlRowKeys: Ref<any[]> = ref([]);
    const codesOption = ref([]);
    const { loading } = useLoading();
    const { pageUI } = usePage();
    const tableData = ref([]);
    const dataTotal = ref(0);
    const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
    const diaLogTitle = ref(''); // 弹窗标题
    const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例

    const fetchSampingStdCodes = async () => {
      try {
        if (dtlData.value.samplingStandardType === '2') {
          const data = (await apiQuality.samplingStd.getSampingStdCode()) as any;
          codesOption.value = data.map((item: { sampingStdCode: any; id: any }) => ({
            label: item.sampingStdCode,
            value: item.sampingStdCode,
          }));
        } else {
          const data = (await apiQuality.oqcInspectStdDtl.getProfileGbDropList()) as any;
          codesOption.value = data.map((item: { profileValue: any; id: any }) => ({
            label: item.profileValue,
            value: item.profileValue,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    };
    const querySelectChange = async (event) => {
      if (dtlData.value.samplingStandardType === '2') {
        const res = (await apiQuality.samplingStd.getSampingStdCode({ key: event.length >= 2 ? event : '' })) as any;
        codesOption.value = res.map((item: { sampingStdCode: any; id: any }) => ({
          label: item.sampingStdCode,
          value: item.sampingStdCode,
        }));
      } else {
        const res = (await apiQuality.oqcInspectStdDtl.getProfileGbDropList({
          key: event.length >= 2 ? event : '',
        })) as any;
        codesOption.value = res.map((item: { profileValue: any; id: any }) => ({
          label: item.profileValue,
          value: item.profileValue,
        }));
      }
    };
    const onAdd = () => {
      formRef.value.reset({ type: 'empty' });
      diaLogTitle.value = '检验项目新增';
      formVisible.value = true;
      dtlData.value.samplingStandardType = '1';
    };
    // 下拉初始数据
    const characteristicsOptions = [
      { label: '计数', value: 1 },
      { label: '计量', value: 2 },
    ];
    // 下拉初始数据
    const stdTypeOption = [
      { label: '首检', value: 1 },
      { label: '巡检', value: 2 },
      { label: '抽检', value: 4 },
      { label: '复检', value: 8 },
    ];
    const getLabelByValue = (value) => {
      const option = stdTypeOption.find((item) => item.value === value);
      return option ? option.label : '';
    };

    const tableStdDtlColumns: PrimaryTableCol<TableRowData>[] = [
      { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
      {
        colKey: 'itemName',
        title: '项目名称',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'itemCategoryName',
        title: '项目类别',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'characteristicsName',
        title: '项目特性',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'inspectTypeListOp',
        title: '检验类型',
        align: 'center',
        width: '250',
      },
      {
        colKey: 'inspectTool',
        title: '检验工具',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'technicalRequest',
        title: '技术要求',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'inspectBasis',
        title: '检验依据',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'samplingStandardCode',
        title: '抽样标准',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'unqualifyCategoryName',
        title: '不合格分类',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'inspectLevelName',
        title: '检验水平',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'uomName',
        title: '单位',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'attachement',
        title: '附件',
        align: 'center',
        width: '110',
      },
    ];
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

    const statusOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'OQC_INSPECT_STD_STATUS' }).then((data) => {
      statusOption.value = data;
    });
    const categoryOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'Q_ITEM_CATEGORY' }).then((data) => {
      categoryOption.value = data;
    });
    const levelOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_LEVEL' }).then((data) => {
      levelOption.value = data;
    });
    const unCategoryOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'Q_UNQUALIFY_CATEGORY' }).then((data) => {
      unCategoryOption.value = data;
    });
    const propertyOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_PROPERTY' }).then((data) => {
      propertyOption.value = data;
    });

    onMounted(() => {
      console.log('123123');
    });
    const onConfirmDtl = async () => {
      // 首先创建一个数组来存储需要检查非空的属性
      const requiredFields = [
        'itemCategory',
        'itemName',
        'itemSeq',
        'characteristics',
        'samplingStandardType',
        'samplingStandardCode',
        'inspectTool',
        'unqualifyCategory',
        'inspectBasis',
        'inspectTypeList',
        'inspectProperty',
      ];

      // 遍历 requiredFields 数组，检查每个属性是否为空
      const emptyFields = [];
      requiredFields.forEach((field) => {
        if (!dtlData.value[field]) {
          emptyFields.push(field);
          console.log(emptyFields);
        }
      });
      console.log(dtlData.value);
      // 如果存在空值属性，则输出提示信息并阻止添加操作
      if (emptyFields.length > 0) {
        MessagePlugin.warning('请补充表单信息');
        return;
      }
      if (dtlData.value.samplingStandardType === '1') {
        if (isEmpty(dtlData.value.inspectLevel)) {
          MessagePlugin.error('请补充表单信息');
          return;
        }
      }
      if (!Number(dtlData.value.itemSeq)) {
        MessagePlugin.error('项目行号须为整数');
        return;
      }
      const item = tableData.value.find((item) => item.itemName === dtlData.value.itemName);
      if (item) {
        MessagePlugin.warning('不允许添加相同项目名称的检验项目');
        return;
      }

      if (dtlData.value.uom) {
        const res = await apiQuality.oqcInspectStdDtl.getUom({ uom: dtlData.value.uom });
        dtlData.value.uomName = res.uomName;
      }
      if (dtlData.value.inspectLevel) {
        dtlData.value.inspectLevelName = levelOption.value.find(
          (item) => item.value === dtlData.value.inspectLevel,
        )?.label;
      }
      tableData.value.push({
        ...dtlData.value,
        index: tableData.value.length,
        samplingStandardTypeName: dtlData.value.samplingStandardType === '1' ? '国标' : '企标',
        itemCategoryName: categoryOption.value.find((item) => item.value === dtlData.value.itemCategory)?.label,
        unqualifyCategoryName: unCategoryOption.value.find((item) => item.value === dtlData.value.unqualifyCategory)
          ?.label,
        characteristicsName: characteristicsOptions[Number(dtlData.value.characteristics) - 1].label,
      });
      dataTotal.value += 1;
      formVisible.value = false;
    };
    const ids = ref([]);
    const onDelDtlData = async () => {
      const idsDel = [];
      const noId = [];
      await dtlRowKeys.value.forEach((number) => {
        const item = tableData.value[number];
        if (item.id) {
          ids.value.push(item.id);
          idsDel.push(item);
        } else {
          noId.push(item);
        }
      });
      // 筛选出 tableData.value 中不在 noId 数组中的元素
      if (noId.length > 0) {
        tableData.value = tableData.value.filter((item) => !noId.includes(item));
      }
      if (ids.value.length > 0) {
        // await apiQuality.oqcInspectStdDtl.delByIds(ids);
        tableData.value = tableData.value.filter((item) => !idsDel.includes(item));
      }
      MessagePlugin.success('删除成功');
      dataTotal.value -= dtlRowKeys.value.length;
      dtlRowKeys.value = [];
    };
    const submit = async () => {
      try {
        if (isEmpty(formData.value.inspectStdCode)) {
          MessagePlugin.error('请输入标准编码');
          return false;
        }
        if (isEmpty(formData.value.inspectStdName)) {
          MessagePlugin.error('请输入标准名称');
          return false;
        }
        if (isEmpty(formData.value.timeEffective)) {
          MessagePlugin.error('请选择生效时间');
          return false;
        }
        if (isEmpty(formData.value.timeInvalid)) {
          MessagePlugin.error('请选择失效时间');
          return false;
        }
        if (isEmpty(formData.value.inspectTypeList)) {
          MessagePlugin.error('请选择检验类型');
          return false;
        }

        const timeEffective = new Date(formData.value.timeEffective);
        const timeInvalid = new Date(formData.value.timeInvalid);

        if (timeEffective >= timeInvalid) {
          MessagePlugin.error('失效时间必须大于生效时间');
          return false;
        }
        if (tableData.value.length < 1) {
          MessagePlugin.error('请新增标准明细');
          return false;
        }

        formData.value.status = formData.value.saveTpye === 'add' ? 'EFFECTIVE' : 'DRAFT';
        if (formData.value.operateTpye === 'add') {
          await apiQuality.oqcInspectStd.addOqcInspectStd({ ...formData.value, list: tableData.value });
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await apiQuality.oqcInspectStd.changeStd({
            ...formData.value,
            ids: ids.value,
            list: tableData.value,
            total: dataTotal.value,
          });
          MessagePlugin.success('编辑成功');
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    const init = () => {
      dtlRowKeys.value = [];
      formData.value = {
        operateTpye: 'add',
        saveTpye: 'add',
        id: '',
        inspectStdCode: '',
        inspectStdName: '',
        groupInspectStdId: '',
        revision: null,
        timeEffective: '',
        timeInvalid: '',
        status: '',
        inspectTypeList: [],
      };
      tableData.value = [];
    };
    const onRefresh = () => {
      getDtlByStdId();
    };
    const getDtlByStdId = async () => {
      const res = await apiQuality.oqcInspectStdDtl.getAllDtlByStdId({
        stdId: formData.value.id,
        pageNum: pageUI.value.page,
        pageSize: pageUI.value.rows,
      });
      tableData.value = res.list.map((item, index) => ({ ...item, index }));
      dataTotal.value = res.total;
    };
    const onDtlSelectedChange = (value: any) => {
      dtlRowKeys.value = value;
    };
    return {
      init,
      submit,
      CmpTable,
      rules,
      formRef,
      propertyOption,
      unCategoryOption,
      levelOption,
      getDtlByStdId,
      onRefresh,
      onDtlSelectedChange,
      dtlRowKeys,
      diaLogTitle,
      categoryOption,
      onAdd,
      onDelDtlData,
      querySelectChange,
      dtlData,
      formVisible,
      formData,
      tableStdDtlColumns,
      dataTotal,
      statusOption,
      stdTypeOption,
      characteristicsOptions,
      tableData,
      codesOption,
      fetchSampingStdCodes,
      getLabelByValue,
      onConfirmDtl,
      pageUI,
      loading,
    };
  },
};
</script>

<style scoped>
.table-title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  margin-right: 8px; /* 控制标签之间的间距 */
  align-items: center; /* 垂直居中 */
}
</style>
