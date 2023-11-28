import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
    parentLevel: '上一层级',
    processingCategoryName: '处理方法类别名称',
    processingCode: '处理方法编码',
    processingName: '处理方法名称',
  },
  en_US: {
    ...common.en_US,
    parentLevel: 'Parent Level',
    processingCategoryName: 'processing Category Name',
    processingCode: 'processing Code',
    processingName: 'processing Name',
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
