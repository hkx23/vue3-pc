/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import CmpPlugins from '@/components/cmp-plugins';

import '@/utils/core';
import '@/api/mock';

import App from './App.vue';
import i18n from './locales';
import router from './router';
import { store } from './store';

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import '@/style/index.less';
import './permission';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);
app.use(CmpPlugins);

app.mount('#app');
