<template>
  <t-row class="b-item">
    <t-col v-if="props.showIcon" class="avatar">
      <t-avatar>{{ props.avatarLabel || props.name?.charAt(0)?.toUpperCase() }}</t-avatar>
    </t-col>
    <t-col>
      <p>
        <b>{{ props.name }}</b> <sub>{{ props.code }}</sub>
      </p>
      <!-- <div>
        {{ props.subName }}
      </div> -->
      <div class="desc">
        {{ (props.subName && props.subName !== props.description ? `(${props.subName}) ` : '') + props.description }}
      </div>
    </t-col>
  </t-row>
</template>
<script setup lang="tsx">
const props = defineProps({
  showIcon: {
    type: Boolean,
    default: true,
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
});
</script>
<style scoped lang="less">
.b-item {
  font-size: 12px;
  cursor: default;

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
    color: var(--td-text-color-placeholder);
    position: relative;
    top: -3px;
    font-size: 12px;
  }

  .desc {
    color: var(--td-text-color-placeholder);
  }
}
</style>
