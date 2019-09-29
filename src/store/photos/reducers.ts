import { PhotosState, PhotosTypes } from 'store/photos/types';

export function photosReducer(state: PhotosState = null, action: PhotosTypes): PhotosState {
    switch (action.type) {
        case 'SET_PHOTOS':
            return action.payload;
        default:
            return state;
    }
}
