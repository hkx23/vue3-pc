/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';
import { store } from '@/store';

import App from './App.vue';
import router from './router';
import i18n from './locales';

import '@/style/index.less';

const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');
