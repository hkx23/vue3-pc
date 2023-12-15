<template>
  <h1>This is Page1</h1>
  <b>params: {{ props.id }}</b>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();
</script>
