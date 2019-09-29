import { createElement } from 'react';
import { hydrate } from 'react-dom';
import { AppState } from 'store';
import { App } from 'components/App/App@client';
import { PAGES } from 'pages';
import { LazyComponentType } from 'components/Lazy/Lazy';
import { getRoute } from 'selectors/getRoute/getRoute';

declare global {
    interface Window {
        __PRELOADED_STATE__: AppState;
    }
}

const state = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', async () => {
    // Load module
    let route = getRoute(state);

    if (route && PAGES[route]) {
        await (PAGES[route].component as LazyComponentType).loader();
    }

    hydrate(createElement(App, { state }), document.getElementById('root'));
});
