import { ThunkAction } from 'redux-thunk';
import { AppState, AppTypes, mergeState } from 'store/index';

export function fetchRoute(url: string): ThunkAction<Promise<void>, AppState, string, AppTypes> {
    return async dispatch => {
        let urlObj = new URL(location.origin + '/api/route');
        urlObj.searchParams.append('url', url);

        let response = await fetch(String(urlObj));
        let data: AppState = await response.json();

        dispatch(mergeState(data));
    };
}
