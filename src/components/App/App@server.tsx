import * as React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'utils/createStore/createStore';
import { ExpressState } from 'server/schema/ExpressState';
import { App as BaseApp } from 'components/App/App';
import { StaticRouter } from 'react-router';

export interface AppProps {
    state: ExpressState;
    url: string;
}

export const App: React.FC<AppProps> = function App({ url, state: { state, js, css } }: AppProps) {
    let store = createStore(state);

    return (
        <Provider store={store}>
            <StaticRouter location={url}>
                <html lang="ru">
                    <head>
                        {css.map(file => (
                            <link rel="stylesheet" href={file} key={file} />
                        ))}

                        <title>ШРИ: React</title>

                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </head>
                    <body>
                        <div id="root">
                            <BaseApp />
                        </div>

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
                                    /</g,
                                    '\\u003c',
                                )}`,
                            }}
                        />

                        {js.map(file => (
                            <script src={file} key={file} defer />
                        ))}
                    </body>
                </html>
            </StaticRouter>
        </Provider>
    );
};
