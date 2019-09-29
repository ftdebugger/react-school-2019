import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { AppState } from 'store';
import { Provider } from 'react-redux';
import { createStore } from 'utils/createStore/createStore';
import { App as BaseApp } from 'components/App/App';

export interface AppProps {
    state: AppState;
}

export const App: React.FC<AppProps> = function App({ state }: AppProps) {
    return (
        <Provider store={createStore(state)}>
            <BrowserRouter>
                <React.Suspense fallback={<h1>Loading</h1>}>
                    <BaseApp />
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};
