import { createFileRoute, Outlet } from '@tanstack/react-router';
import { QIANKUN_CONTAINER } from '../app-loaders';

export const Route = createFileRoute('/apps')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>Hello "/apps"!</div>
      <div id={QIANKUN_CONTAINER} />
      <Outlet />
    </>
  );
}
