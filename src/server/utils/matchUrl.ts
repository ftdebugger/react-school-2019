import { RouterState, RouterParams } from 'store/router/types';
import { PAGES } from 'pages';
import { Routes } from 'routes';
import { matchPath } from 'react-router';

export function matchUrl(url: string): RouterState {
    for (let route of Object.keys(PAGES) as Routes[]) {
        let result = matchPath<RouterParams>(url, PAGES[route]);

        if (result) {
            return { route, ...result };
        }
    }
}
