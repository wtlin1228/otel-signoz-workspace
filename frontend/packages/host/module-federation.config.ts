import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    // we use the runtime API to load our remotes
    // see `src/app-loaders/module-federation.ts`
    // mf1: 'mf1@http://localhost:4001/mf-manifest.json',
    // mf2: 'mf2@http://localhost:4002/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
