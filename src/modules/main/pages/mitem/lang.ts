import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
  },
  en_US: {
    ...common.en_US,
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
