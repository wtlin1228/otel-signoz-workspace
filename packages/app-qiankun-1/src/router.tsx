import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const getRouter = ({ basepath }: { basepath: string }) =>
  createRouter({
    routeTree,
    basepath,
  });

export type RouterType = ReturnType<typeof getRouter>;

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
