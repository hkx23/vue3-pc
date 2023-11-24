import '@/assets/libs/web-core';

import { useI18n } from 'vue-i18n';

// 所有页面设置请求基础路径
fw.config.baseUrl = import.meta.env.VITE_API_URL;

if (typeof window !== 'undefined' && window.top !== window) {
  fw.ipc.addTarget('portal', window.top);

  const name = window.location.pathname.replace('/', '');
  window.top.fw?.ipc.addTarget(name, window);

  fw.ipc.on('change-language', (lang) => {
    console.log('change-language', lang);
    // const { locale } = useI18n({ useScope: 'global' });
    // locale.value = lang;
  });
}
