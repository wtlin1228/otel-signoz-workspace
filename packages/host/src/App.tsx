import { RouterProvider } from '@tanstack/react-router';
import * as React from 'react';
import { registerQiankunApps } from './app-loaders';
import { router } from './router';

const App = () => {
  React.useEffect(() => {
    registerQiankunApps();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
