import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { glob } from 'glob';
// import AutoImport from 'unplugin-auto-import/vite';
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

import vitePluginHistory from './plugins/vite-plugin-history';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL, VITE_API_URL_PREFIX, VITE_BUILDING_MODULE } = loadEnv(mode, CWD);
  const isPrd = mode === 'release';

  let inputs = null;
  let outDir = '';

  const buildingModule = VITE_BUILDING_MODULE;
  if (isPrd) {
    if (buildingModule) {
      const pattern = path.join(`${buildingModule}.html`).replaceAll('\\', '/');
      const entries = glob.sync(pattern);

      const modules: { [index: string]: any } = {};
      entries.forEach((file) => {
        // const key = file.split('/')[2];
        modules.index = path.resolve(__dirname, file);
      });

      inputs = { ...modules };

      outDir = `./dist/pages/${buildingModule}`;
    } else {
      outDir = './dist';
      inputs = { main: path.resolve(__dirname, 'index.html') };
    }
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
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
      svgLoader(),
      // AutoImport({
      //   resolvers: [
      //     TDesignResolver({
      //       library: 'vue-next',
      //     }),
      //     TDesignResolver({
      //       library: 'mobile-vue',
      //     }),
      //   ],
      // }),
      // Components({
      //   resolvers: [
      //     TDesignResolver({
      //       library: 'vue-next',
      //     }),
      //     TDesignResolver({
      //       library: 'mobile-vue',
      //     }),
      //   ],
      // }),
      vitePluginHistory(),
    ],

    server: {
      port: 3001,
      host: '0.0.0.0',
      proxy: {
        [VITE_API_URL_PREFIX]: 'http://127.0.0.1:8000/',
      },
    },

    build: {
      outDir,
      rollupOptions: {
        input: inputs,
      },
    },
  };
};
