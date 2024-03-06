import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

import zhCn from './zh-CN.json';

const lang = {
  ...common,
  'zh-CN': {
    ...common['zh-CN'],
    ...zhCn,
  },
};

export function useLang() {
  const { t } = useI18n<{ messages: typeof lang }>({
    messages: lang,
  });

  return {
    t,
  };
}

export default lang;
