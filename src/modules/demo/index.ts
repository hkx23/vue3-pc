/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import CmpPlugins from '@/components/cmp-plugins';

import '@/utils/core';

import App from './App.vue';
import router from './router';
import i18n from '@/locales';
import { store } from '@/store';

import '@/style/index.less';
import '@/style/module-page.less';

const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(i18n);
app.use(store);

app.use(CmpPlugins);
app.mount('#app');
