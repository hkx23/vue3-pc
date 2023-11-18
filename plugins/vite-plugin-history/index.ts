import history from 'connect-history-api-fallback';
import { PluginOption } from 'vite';

export default function vitePluginHistory(inputs: { [index: string]: any }): PluginOption {
  return {
    name: 'vite-plugin-history',
    configureServer(server) {
      const rewrites = [];
      for (const key in inputs) {
        const regex = new RegExp(`^/${key}`, 'g');
        rewrites.push({ from: regex, to: `/${key}.html` });
      }
      server.middlewares.use(
        history({
          rewrites,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        }),
      );
    },
  };
}
