import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
    parentLevel: '上一层级',
    levelName: '组织层级',
    levelCode: '层级代码',
    levelSeq: '层级序列',
  },
  en_US: {
    ...common.en_US,
    parentLevel: 'Parent Level',
    levelName: 'Level Name',
    levelCode: 'Level Code',
    levelSeq: 'Level Seq',
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
