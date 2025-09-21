import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  output: {
    assetPrefix: 'http://localhost:3001/',
  },
  plugins: [pluginReact()],
  tools: {
    rspack: {
      output: {
        library: {
          name: 'qiankun1',
          type: 'umd',
        },
      },
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  server: {
    port: 3001,
  },
});
