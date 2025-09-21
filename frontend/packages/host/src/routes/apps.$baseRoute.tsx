import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router';
import * as React from 'react';
import { ModuleFederationRemoteManager } from '../app-loaders';
import { APP_CONFIGS } from '../configs';

const remoteManager = new ModuleFederationRemoteManager();

export const Route = createFileRoute('/apps/$baseRoute')({
  loader: ({ params: { baseRoute } }) => {
    const mfAppConfig = APP_CONFIGS.find(
      (appConfig) =>
        appConfig.architecture === 'Module Federation' &&
        appConfig.id === baseRoute
    );

    if (!mfAppConfig) {
      return;
    }

    return remoteManager.getRemote(mfAppConfig);
  },
  component: RouteComponent,
});

const Noop = () => null;

function RouteComponent() {
  const remote = useLoaderData({ from: Route.id });

  const baseRoute = useParams({
    from: '/apps/$baseRoute',
    select: (params) => params.baseRoute,
  });

  const RootComponent = React.useMemo(() => {
    if (!remote) {
      return Noop;
    }
    return React.lazy(async () => {
      return { default: React.memo(await remote.RootComponent) };
    });
  }, [remote]);

  if (!remote) {
    return null;
  }

  return (
    <React.Suspense fallback={<div>Loading {baseRoute} ...</div>}>
      <RootComponent />
    </React.Suspense>
  );
}
