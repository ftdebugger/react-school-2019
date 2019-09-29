import { RouterState } from 'store/router/types';

export function routerReducer(state: RouterState): RouterState {
    return state || null;
}
