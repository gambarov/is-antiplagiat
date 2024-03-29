import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistedStore } from './store';
import { appRouter } from './router';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ReduxProvider store={appStore}>
            <PersistGate loading={null} persistor={persistedStore}>
                <RouterProvider router={appRouter} />
            </PersistGate>
        </ReduxProvider>
    </React.StrictMode>,
);
