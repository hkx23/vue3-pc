import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
    unitName: '计量单位名称',
    unitSymbol: '计量单位符号',
    operation: '操作',
  },
  en_US: {
    ...common.en_US,
    unitName: 'Unit Name',
    unitSymbol: 'Unit Symbol',
    operation: 'Operation',
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
