import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // https://vite.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      checker({
        // e.g. use TypeScript check
        typescript: true,
      }),
    ],
    server: {
      port: env.VITE_PORT as unknown as number,
    },
    build: {
      outDir: 'build',
    },
  };
});
