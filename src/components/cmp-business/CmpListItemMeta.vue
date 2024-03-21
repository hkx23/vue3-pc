<template>
  <t-row class="b-item">
    <t-col v-if="props.showIcon" class="avatar">
      <t-avatar>{{ props.avatarLabel || props.name?.charAt(0)?.toUpperCase() }}</t-avatar>
    </t-col>
    <t-col flex="auto">
      <t-row style="font-size: 12px">
        <t-col flex="auto">
          <div class="flex-row">
            <span class="itemCode" :title="props.name">{{ props.name }}</span>
            <span class="itemName" :title="props.code">{{ props.code }}</span>
          </div>

          <!-- <div>
        {{ props.subName }}
      </div> -->
          <div class="desc">
            {{
              (props.subName && props.subName !== props.description ? `(${props.subName}) ` : '') + props.description
            }}
            <!-- {{ props.description }} -->
          </div>
        </t-col>
        <t-col class="suffix-container">
          <t-tag
            v-if="suffixTag"
            max-width="80"
            :class="'suffix-tag' + (props.showCloseButton ? ' auto-hidden' : '')"
            theme="success"
            variant="light-outline"
            size="small"
            :title="suffixTag"
            >{{ suffixTag }}</t-tag
          >
          <check-circle-filled-icon v-if="props.showSuccess && !props.showCloseButton" class="success-state" />
          <t-button v-if="props.showCloseButton" variant="text" shape="square" class="close-btn" @click="onClickClose">
            <close-icon />
          </t-button>
        </t-col>
      </t-row>
    </t-col>
  </t-row>
</template>
<script setup lang="tsx">
import { CheckCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';

const props = defineProps({
  showIcon: {
    type: Boolean,
    default: true,
  },
  showCloseButton: {
    type: Boolean,
    default: false,
  },
  showSuccess: {
    type: Boolean,
    default: false,
  },
  avatarLabel: {
    type: String,
  },
  name: {
    type: String,
  },
  subName: {
    type: String,
  },
  code: {
    type: String,
  },
  description: {
    type: String,
  },
  suffixTag: {
    type: String,
  },
});
const emit = defineEmits(['close']);
const onClickClose = () => {
  emit('close');
};
</script>
<style scoped lang="less">
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.b-item {
  font-size: 12px;
  cursor: default;
  width: 100%;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: hidden-from-left 0.3s;
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-l);

  .avatar {
    height: 45px;
    display: flex;
    align-items: center;
    padding-right: var(--td-comp-paddingTB-m) !important;
  }

  span.itemCode {
    color: #454545;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    max-width: calc(50% - 4px); /* 根据实际情况调整最大宽度（这里假设是父容器一半宽度减去间距） */
  }

  span.itemName {
    color: var(--td-text-color-secondary);
    // position: relative;
    // top: -3px;
    font-size: 12px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(40% - 4px); /* 根据实际情况调整最大宽度（这里假设是父容器一半宽度减去间距） */
  }

  .desc {
    color: var(--td-text-color-secondary);
  }

  .suffix-container {
    position: relative;
    height: 48px;

    .suffix-tag {
      position: absolute;
      right: 0;
      top: 0;
      animation: hidden-from-left 0.3s;
    }

    .success-state {
      color: var(--td-success-color);
      font-size: 16px;
      position: absolute;
      right: 0;
      bottom: 3px;
    }

    .close-btn {
      display: none;
      height: 48px;
      color: var(--td-text-color-placeholder);

      &:hover {
        color: var(--td-text-color-primary);
      }
    }
  }

  &:hover {
    .suffix-tag.auto-hidden {
      display: none;
    }

    .close-btn {
      display: block;
      animation: hidden-from-right 0.3s;
    }
  }

  @keyframes hidden-from-left {
    0% {
      opacity: 0;
      transform: translate(-24px, 0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes hidden-from-right {
    0% {
      opacity: 0;
      transform: translate(24px, 0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
}
</style>
