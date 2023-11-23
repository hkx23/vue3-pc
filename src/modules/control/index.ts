/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import '@/utils/core';

import App from './App.vue';
import router from './router';
import { store } from '../../store';

import '@/style/index.less';

const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(store);
app.mount('#app');
