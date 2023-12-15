<template>
  <h1>This is Page2</h1>
  <b>query: {{ route.query.code }}</b>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
