/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import TmPlugin from '@/components/tmPlugin';

import '@/utils/core';

import App from './App.vue';
import router from './router';
import i18n from '@/locales';
import { store } from '@/store';

import '@/style/index.less';

const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(i18n);
app.use(store);

app.use(TmPlugin);
app.mount('#app');
