<template>
  <t-row class="b-item">
    <t-col v-if="props.showIcon" class="avatar">
      <t-avatar>{{ props.avatarLabel || props.name?.charAt(0)?.toUpperCase() }}</t-avatar>
    </t-col>
    <t-col flex="auto">
      <t-row>
        <t-col flex="auto">
          <div>
            <b>{{ props.name }}</b> <sub>{{ props.code }}</sub>
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
            :class="'suffix-tag' + (props.showCloseButton ? ' auto-hidden' : '')"
            theme="success"
            variant="outline"
            size="small"
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

  b {
    color: #454545;
  }

  sub {
    color: var(--td-text-color-secondary);
    position: relative;
    top: -3px;
    font-size: 12px;
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
