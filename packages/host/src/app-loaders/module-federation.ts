import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { type AppConfig } from '../configs';
import { HostProps } from '@mfw/app-interface';

interface Remote {
  RootComponent: Promise<() => React.ReactElement>;
}

interface IModuleFederationRemoteManager {
  getRemote: (appConfig: AppConfig) => Remote;
}

export class ModuleFederationRemoteManager
  implements IModuleFederationRemoteManager
{
  private idToRemoteMap: Map<string, Remote> = new Map();

  getRemote(appConfig: AppConfig) {
    let remote = this.idToRemoteMap.get(appConfig.id);
    if (remote) {
      return remote;
    }

    registerRemotes([
      {
        name: appConfig.name,
        entry: appConfig.entry,
      },
    ]);

    const RootComponent = loadRemote(appConfig.name).then((remote) => {
      // @ts-expect-error runtime loaded remote doesn't provide types
      const getRootComponent = remote.getRootComponent as (
        hostProps: HostProps
      ) => () => React.ReactElement;

      return getRootComponent({
        basepath: `/apps/${appConfig.id}`,
      });
    });

    remote = {
      RootComponent,
    };

    this.idToRemoteMap.set(appConfig.id, remote);

    return remote;
  }
}
