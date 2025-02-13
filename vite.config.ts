import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // https://vite.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        // e.g. use TypeScript check
        typescript: true,
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    server: {
      port: env.VITE_PORT as unknown as number,
    },
    build: {
      outDir: 'build',
    },
  };
});
