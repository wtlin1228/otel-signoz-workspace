import type { HostProps } from '@mfw/app-interface';
import { RouterProvider } from '@tanstack/react-router';
import { getRouter, type RouterType } from './router';

export const getRootComponent = (props: HostProps) => {
  const router = getRouter({ basepath: props.basepath });
  return () => <App router={router} />;
};

const App = ({ router }: { router: RouterType }) => {
  return <RouterProvider router={router} />;
};
