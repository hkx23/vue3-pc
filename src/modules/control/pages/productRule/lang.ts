import { useI18n } from 'vue-i18n';

import common from '@/locales/common';

const lang = {
  zh_CN: {
    ...common.zh_CN,
    packRule: '包装规则代码/名称',
    packRuleCode: '包装规则代码',
    packRuleName: '包装规则名称',
    packType: '包装类型',
    uom: '单位',
    packQty: '数量',
  },
  en_US: {
    ...common.en_US,
    packRule: 'Packing Rule Code Name',
    packRuleCode: 'Packing Rule Code',
    packRuleName: 'The Name Of The Packaging Rule',
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
