<template>
  <t-row class="b-item">
    <t-col v-if="props.showIcon" class="avatar">
      <t-avatar>{{ props.avatarLabel || props.name?.charAt(0)?.toUpperCase() }}</t-avatar>
    </t-col>
    <t-col flex="auto">
      <div>
        <b>{{ props.name }}</b> <sub>{{ props.code }}</sub>
      </div>
      <!-- <div>
        {{ props.subName }}
      </div> -->
      <div class="desc">
        {{ (props.subName && props.subName !== props.description ? `(${props.subName}) ` : '') + props.description }}
        <!-- {{ props.description }} -->
      </div>
      <t-tag v-if="suffixTag" class="item-tag" theme="success" variant="outline" size="small">{{ suffixTag }}</t-tag>
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
  suffixTag: {
    type: String,
  },
});
</script>
<style scoped lang="less">
.b-item {
  font-size: 12px;
  cursor: default;
  width: 100%;

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

  .item-tag {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
