import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
    levelName: '工序名称',
    levelCode: '工序编码',
    levelSeq: '序号',
  },
  en_US: {
    ...common.en_US,
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
