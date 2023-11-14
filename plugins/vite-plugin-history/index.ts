import history from 'connect-history-api-fallback';
import { PluginOption } from 'vite';

export default function vitePluginHistory(): PluginOption {
  return {
    name: 'vite-plugin-history',
    configureServer(server) {
      server.middlewares.use(
        history({
          rewrites: [
            { from: /\/system/, to: '/system.html' },
            { from: /\/modeling/, to: '/modeling.html' },
          ],
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        }),
      );
    },
  };
}
