import { defaultHostProps } from '@mfw/app-interface';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { getRootComponent } from './App';

const RootComponent = getRootComponent(defaultHostProps);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>
  );
}
