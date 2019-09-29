import { PhotoState, PhotoTypes, SET_PHOTO_LOADING, SET_PHOTO } from 'store/photo/types';

const DEFAULT_STATE: PhotoState = {};

export function photoReducer(state: PhotoState = DEFAULT_STATE, action: PhotoTypes): PhotoState {
    switch (action.type) {
        case SET_PHOTO:
            return action.payload;
        case SET_PHOTO_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
