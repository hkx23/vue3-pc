<template>
  <cmp-container>
    <t-form
      layout="inline"
      :data="formData"
      :show-cancel="true"
      label-align="left"
      label-width="90px"
      :show-error-message="false"
      @submit="submit"
    >
      <cmp-card>
        <t-space class="table-title">单据头</t-space>
        <t-row :gutter="[1, 16]" style="margin-top: 15px">
          <t-col>
            <t-form-item label="单据号" label-align="right">
              <t-input v-model="formData.warehouseCode" :disabled="true" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="仓库" required-mark label-align="right">
              <bcmp-select-business
                v-model="formData.warehouseCode"
                type="warehouse"
                :show-title="false"
                :disabled="formData.operateTpye !== 'add'"
              ></bcmp-select-business>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="货位" label-align="right">
              <bcmp-select-business
                v-model="formData.warehouseCode"
                type="location"
                :show-title="false"
                :disabled="formData.operateTpye !== 'add'"
              ></bcmp-select-business>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="调整原因" required-mark label-align="right">
              <t-select v-model="formData.warehouseCode" label-width="113px" :disabled="formData.operateTpye !== 'add'">
                <t-option
                  v-for="(option, index) in reasonOption"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="科目" required-mark label-align="right">
              <t-select v-model="formData.warehouseCode" label-width="113px" :disabled="formData.operateTpye !== 'add'">
                <t-option
                  v-for="(option, index) in reasonOption"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="费用部门" required-mark label-align="right">
              <t-select v-model="formData.warehouseCode" label-width="113px" :disabled="formData.operateTpye !== 'add'">
                <t-option
                  v-for="(option, index) in reasonOption"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="物料标签" label-align="right">
              <t-input
                v-model="formData.warehouseCode"
                :disabled="!(formData.operateTpye === 'add')"
                style="width: 200px"
              />
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="物料编码" label-align="right">
              <bcmp-select-business
                v-model="formData.warehouseCode"
                type="mitem"
                :show-title="false"
                :disabled="formData.operateTpye !== 'add'"
              ></bcmp-select-business>
            </t-form-item>
          </t-col>
          <!-- <t-col>
            <t-form-item label="业务类型" required-mark label-align="right">
              <t-select v-model="formData.warehouseCode" label-width="113px">
                <t-option
                  v-for="(option, index) in businessTypeOption"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></t-option>
              </t-select>
            </t-form-item>
          </t-col> -->
          <t-col>
            <t-form-item label="交易事务" required-mark label-align="right">
              <t-select v-model="formData.warehouseCode" label-width="113px" :disabled="formData.operateTpye !== 'add'">
                <t-option
                  v-for="(option, index) in businessTypeOption"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col>
            <t-form-item label="备注" label-align="right">
              <t-input
                v-model="formData.warehouseCode"
                :disabled="formData.operateTpye !== 'add'"
                style="width: 320px"
              />
            </t-form-item>
          </t-col>
          <t-col>
            <t-button theme="default" :disabled="formData.operateTpye !== 'add'">重置</t-button>
            <t-button theme="default" :disabled="formData.operateTpye !== 'add'">批量导入</t-button>
            <t-button theme="primary" :disabled="formData.operateTpye !== 'add'">确定</t-button>
          </t-col>
        </t-row>
      </cmp-card>
    </t-form>
    <cmp-card>
      <t-space direction="vertical" style="width: 100%">
        <cmp-table
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="tableMiscellaneousColumns"
          :table-data="tableDataWarehouse"
          :loading="loading"
          :total="dataTotal"
        >
          <template #title>单据明细</template>
          <template #button>
            <t-button theme="primary" :disabled="formData.operateTpye !== 'add'">新增</t-button>
            <t-button theme="default" :disabled="formData.operateTpye !== 'add'">删除</t-button>
          </template>
        </cmp-table>
      </t-space>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableMiscellaneousLabelColumns"
        :table-data="tableDataWarehouse"
        :loading="loading"
        :total="dataTotal"
      >
        <template #title>标签明细</template>
        <template #button>
          <t-button theme="default" :disabled="formData.operateTpye !== 'add'">删除</t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
import { isEmpty } from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

export default {
  name: 'MitemForm',
  setup() {
    const formData = ref({
      operateTpye: 'add',
      id: '',
      isState: false,
      warehouseCode: '',
      warehouseName: '',
      warehouseDesc: '',
      warehouseAttribute: '',
      warehouseCategory: '',
      erpWarehouse: '',
      state: 1,
      isEnableUpload: 0,
      enableUpload: false,
      datetimeUpload: '',
      enableLocation: false,
      fifo: false,
      isEnableLocation: 0,
      isFifo: 0,
    });
    const reasonOption = ref([]);
    const businessTypeOption = ref([]);
    const { loading } = useLoading();
    const { pageUI } = usePage();
    const tableDataWarehouse = ref([]);
    const dataTotal = ref(0);

    const tableMiscellaneousColumns: PrimaryTableCol<TableRowData>[] = [
      { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
      {
        colKey: 'serial-number',
        title: '序号',
        align: 'center',
        width: '60',
      },
      {
        colKey: 'mitemLabelNo',
        title: '物料编码',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '物料描述',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '单位',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '仓库',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '货位',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '现有量',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '交易数量',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '仓库数量合计',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '责任部门',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '备注',
        align: 'center',
        width: '110',
      },
    ];
    const tableMiscellaneousLabelColumns: PrimaryTableCol<TableRowData>[] = [
      { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
      {
        colKey: 'serial-number',
        title: '序号',
        align: 'center',
        width: '60',
      },
      {
        colKey: 'mitemLabelNo',
        title: '标签条码',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '物料编码',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '物料描述',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '仓库',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '货位',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '单位',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '交易数量',
        align: 'center',
        width: '110',
      },
      {
        colKey: 'mitemLabelNo',
        title: '标签数量',
        align: 'center',
        width: '110',
      },
    ];
    const warehousePropertyOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'W_WAREHOUSE_PROPERTY' }).then((data) => {
      warehousePropertyOption.value = data;
    });
    const warehouseTypeOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'W_WAREHOUSE_TYPE' }).then((data) => {
      warehouseTypeOption.value = data;
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        if (isEmpty(formData.value.warehouseName)) {
          MessagePlugin.error('请输入仓库名称');
          return false;
        }
        if (isEmpty(formData.value.warehouseCode)) {
          MessagePlugin.error('请输入仓库编码');
          return false;
        }
        formData.value.isEnableLocation = formData.value.enableLocation === true ? 1 : 0;
        formData.value.isFifo = formData.value.fifo === true ? 1 : 0;
        formData.value.isEnableUpload = formData.value.enableUpload === true ? 1 : 0;
        formData.value.state = formData.value.isState === true ? 1 : 0;

        if (formData.value.operateTpye === 'add') {
          await api.warehouse.addWareHouse(formData.value);
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await api.warehouse.modifyWareHouse(formData.value);
          MessagePlugin.success('编辑成功');
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    const init = () => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.warehouseCode = '';
      formData.value.warehouseName = '';
      formData.value.warehouseDesc = '';
      formData.value.erpWarehouse = '';
      formData.value.datetimeUpload = '';
      formData.value.isState = true;
      formData.value.enableLocation = false;
      formData.value.enableUpload = false;
      formData.value.fifo = false;
      formData.value.warehouseAttribute = '';
      formData.value.warehouseCategory = '';
    };
    return {
      init,
      submit,
      CmpTable,
      tableMiscellaneousLabelColumns,
      formData,
      tableMiscellaneousColumns,
      dataTotal,
      tableDataWarehouse,
      reasonOption,
      businessTypeOption,
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
</style>
