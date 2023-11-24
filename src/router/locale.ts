import { defaultLanguage, i18n } from '@/locales/index';

export const renderMenuTitle = (title: string | Record<string, string>) => {
  if (typeof title === 'string') return title;
  return title[i18n.global.locale.value] || title[defaultLanguage];
};
