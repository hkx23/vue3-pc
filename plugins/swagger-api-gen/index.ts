import { generateApi, GenerateApiParams } from 'swagger-typescript-api';
import { PluginOption } from 'vite';

export default function vueSwaggerApiGen(option: GenerateApiParams): PluginOption {
  if (!option) return null;

  return {
    name: 'swagger-api-gen',
    enforce: 'pre',
    apply: 'serve',
    buildStart() {
      generateApi(option).catch((e) => console.error(e));
    },
  };
}
