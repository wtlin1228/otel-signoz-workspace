import { type HostProps } from '@mfw/app-interface';
import { registerMicroApps, start, type RegistrableApp } from 'qiankun';
import { APP_CONFIGS } from '../configs';

export const QIANKUN_CONTAINER = 'qiankun-container';

export const registerQiankunApps = () => {
  const qiankunApps: RegistrableApp<HostProps>[] = [];

  for (const appConfig of APP_CONFIGS) {
    if (appConfig.architecture === 'Qiankun') {
      const path = `/apps/${appConfig.id}`;
      qiankunApps.push({
        name: appConfig.id,
        entry: appConfig.entry,
        container: `#${QIANKUN_CONTAINER}`,
        activeRule: path,
        props: {
          basepath: path,
        },
      });
    }
  }

  registerMicroApps(qiankunApps);
  start({ prefetch: false });
};
