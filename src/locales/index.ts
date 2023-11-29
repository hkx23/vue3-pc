import { DropdownOption } from 'tdesign-vue-next';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';

// 导入语言文件
const langPortalPages = import.meta.glob('./lang/*/index.ts', { eager: true });
const langModuleMap = new Map<string, Object>();

export const langCode: Array<string> = [];

// 获取浏览器默认语言环境
const browserLanguage = navigator.language.replace('-', '_');
export const defaultLanguage = 'zh-CN';

// 生成语言模块列表
const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langPortalPages);

  fullPaths.forEach((fullPath) => {
    const k = fullPath.replace('./lang', '');
    const startIndex = 1;
    const lastIndex = k.lastIndexOf('/');
    const code = k.substring(startIndex, lastIndex);
    langCode.push(code);
    langModuleMap.set(code, langPortalPages[fullPath]);
  });
  fw.config.languageCodes = langCode;
};

// 导出 Message
const importMessages = computed(() => {
  generateLangModuleMap();

  const message: Recordable = {};
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default;
  });
  return message;
});

export const i18n = createI18n({
  legacy: false,
  locale: fw.getLanguage() || browserLanguage || defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages: importMessages.value,
  globalInjection: true,
});

export const langList = computed(() => {
  if (langModuleMap.size === 0) generateLangModuleMap();

  const list: DropdownOption[] = [];
  langModuleMap.forEach((value: any, key) => {
    list.push({
      content: value.default.lang,
      value: key,
    });
  });

  return list;
});

// @ts-ignore
export const { t } = i18n.global;

export default i18n;
