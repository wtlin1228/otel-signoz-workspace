import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mf2',
  exposes: {
    '.': './src/exposed.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  getPublicPath: `function() { return "http://localhost:4002/"; }`,
});
