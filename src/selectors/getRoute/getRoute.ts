import { AppState } from 'store';
import { Routes } from 'routes';

export function getRoute(state: Optional<AppState>): Routes {
    if (state && state.router && state.router.route) {
        return state.router.route;
    }

    return Routes.NOT_FOUND;
}
