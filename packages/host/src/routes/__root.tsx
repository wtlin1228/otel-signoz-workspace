import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { APP_CONFIGS } from '../configs';
import { logInfo } from '../instrument';

export const Route = createRootRoute({
  component: () => (
    <>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {APP_CONFIGS.map((appConfig) => (
          <Link
            key={appConfig.id}
            to="/apps/$baseRoute"
            params={{ baseRoute: appConfig.id }}
            onClick={() => {
              logInfo('navigate to app', { 'app.id': appConfig.id });
            }}
          >
            {appConfig.name}
          </Link>
        ))}
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
