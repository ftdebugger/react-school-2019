import { combineReducers, Action } from 'redux';
import { photosReducer } from 'store/photos/reducers';
import { routerReducer } from 'store/router/reducers';
import { photoReducer } from 'store/photo/reducers';
import { PhotoTypes } from 'store/photo/types';
import { PhotosTypes } from 'store/photos/types';

export const MERGE_STATE = 'MERGE_STATE';

let storeReducer = combineReducers({
    router: routerReducer,
    photos: photosReducer,
    photo: photoReducer,
});

export type AppState = ReturnType<typeof storeReducer>;

export type AppTypes = PhotoTypes | PhotosTypes | MergeStateAction;

export interface MergeStateAction {
    type: typeof MERGE_STATE;
    payload: Partial<AppState>;
}

export function mergeState(state: Partial<AppState>): MergeStateAction {
    return {
        type: MERGE_STATE,
        payload: state,
    };
}

export function rootReducer(state: AppState | undefined, action: Action<any>): AppState {
    state = storeReducer(state, action);

    switch (action.type) {
        case 'MERGE_STATE':
            return { ...state, ...(action as MergeStateAction).payload };
        default:
            return state;
    }
}
