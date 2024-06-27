<template>
  <t-dialog v-model:visible="visibleDialog" header="提示" :width="520">
    <div class="ant-confirm-body">
      <i class="anticon anticon-close-circle" style="color: #f00"></i>
      <span class="ant-confirm-title">当前无法发布</span>
      <div class="ant-confirm-content">
        <div>
          <p class="error-modal-desc">以下内容不完善，需进行修改</p>
          <div class="error-modal-list">
            <div v-for="(item, index) in list" :key="index" class="error-modal-item">
              <div class="error-modal-item-label">流程设计</div>
              <div class="error-modal-item-content">{{ item.name }} 未选择{{ item.type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <t-button theme="default" @click="visibleDialog = false">我知道了</t-button>
      <t-button theme="primary" @click="visibleDialog = false">前往修改</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  list: { name: string; type: string }[];
  visible: boolean;
}>();
const emits = defineEmits(['update:visible']);

const visibleDialog = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits('update:visible', val);
  },
});
</script>

<style scoped>
.ant-confirm-body .ant-confirm-title {
  color: rgb(0 0 0 / 85%);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  display: block;
  overflow: hidden;
}

.ant-confirm-body .ant-confirm-content {
  margin-left: 38px;
  font-size: 14px;
  color: rgb(0 0 0 / 65%);
  margin-top: 8px;
}

.ant-confirm-body > .anticon {
  font-size: 22px;
  margin-right: 16px;
  float: left;
}
</style>
