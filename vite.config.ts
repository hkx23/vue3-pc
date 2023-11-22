import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { glob } from 'glob';
// import { visualizer } from 'rollup-plugin-visualizer';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
// import viteCompression from 'vite-plugin-compression';
import svgLoader from 'vite-svg-loader';

import vitePluginHistory from './plugins/vite-plugin-history';
// @ts-ignore
import { swaggerApiGen } from './src/assets/libs/web-core';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const {
    VITE_BASE_URL,
    VITE_API_URL,
    VITE_API_URL_PREFIX,
    VITE_IS_REQUEST_PROXY,
    VITE_BUILDING_MODULE,
    VITE_API_GENERATE_MODULE,
  } = loadEnv(mode, CWD);
  const isPrd = mode === 'production';

  let inputs: { [index: string]: any } = null;
  const outDir = './dist';

  const buildingModule = VITE_BUILDING_MODULE;
  if (buildingModule) {
    const pattern = path.join(`${buildingModule}.html`).replaceAll('\\', '/');
    const entries = glob.sync(pattern);

    const modules: { [index: string]: any } = {};
    entries.forEach((file) => {
      const key = path.basename(file, path.extname(file));
      modules[key] = path.resolve(__dirname, file);
    });

    inputs = { ...modules };
  } else {
    inputs = { main: path.resolve(__dirname, 'index.html') };
  }

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      vitePluginHistory(inputs),
      mode === 'mock'
        ? null
        : swaggerApiGen({
            baseUrl: VITE_API_URL,
            inputs: VITE_API_GENERATE_MODULE,
          }),
      // viteCompression({
      //   deleteOriginFile: true,
      //   threshold: 10 * 1024,
      // }),
      // visualizer({
      //   gzipSize: true,
      // }),
    ],

    server: {
      port: 3001,
      host: '0.0.0.0',
      proxy: VITE_IS_REQUEST_PROXY
        ? {
            [VITE_API_URL_PREFIX]: 'http://127.0.0.1:8000/',
          }
        : {},
    },

    build: {
      outDir,
      rollupOptions: {
        input: isPrd ? inputs : null,
        output: {
          // manualChunks: (id) => {
          //   if (id.includes('echarts')) return 'echarts';
          // },
        },
      },
    },
  };
};
