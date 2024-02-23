<template>
  <t-form ref="formRef">
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="项目类别" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="针" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验类型" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="甲" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验内容" name="mitemCode">
          <t-input></t-input>
        </t-form-item>
      </t-col>
      <!-- 第 2️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="检验依据" name="mitemCode">
          <t-input></t-input>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="技术要求" name="mitemCode">
          <t-input></t-input>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="是否CTQ" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="是" value="apple" />
            <t-option key="apple" label="否" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 3️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="项目特性" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="计数" value="apple" />
            <t-option key="apple" label="非计数" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验工具" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="目视" value="apple" />
            <t-option key="apple" label="斜视" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="基准值" name="mitemCode">
          <t-col :span="8" style="padding: 0">
            <t-select :clearable="true">
              <t-option key="apple" label="10" value="apple" />
              <t-option key="apple" label="100" value="apple" />
            </t-select>
          </t-col>
          <t-col :span="4" style="padding-right: 0">
            <bcmp-select-business label="" type="uom" :clearable="true" placeholder="单位"></bcmp-select-business>
          </t-col>
        </t-form-item>
      </t-col>
      <!-- 第 4️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="最小值" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="计数" value="apple" />
            <t-option key="apple" label="非计数" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="最大值" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="目视" value="apple" />
            <t-option key="apple" label="斜视" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="不合格分类" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="一般缺陷" value="apple" />
            <t-option key="apple" label="二班缺陷" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 5️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="抽样方案类型" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="计数" value="apple" />
            <t-option key="apple" label="非计数" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="抽样方案" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="目视" value="apple" />
            <t-option key="apple" label="斜视" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验水平" name="mitemCode">
          <t-select :clearable="true">
            <t-option key="apple" label="10" value="apple" />
            <t-option key="apple" label="100" value="apple" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 5️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="附件：" name="mitemCode">
          <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    :cancel-btn="null"
    :confirm-btn="null"
    width="50%"
  >
    <cmp-container :full="true">
      <bcmp-upload-content :file-list="fileList"></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx">
import { ref } from 'vue';

const fileList = ref([]);
const formVisible = ref(false);
</script>
