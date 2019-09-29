import { SetPhotoAction, SET_PHOTO, PhotoState, SET_PHOTO_LOADING, SetPhotoLoadingAction } from 'store/photo/types';
import { ThunkAction } from 'redux-thunk';
import { AppState, AppTypes } from 'store/index';

export function setPhoto(photo: PhotoState): SetPhotoAction {
    return {
        type: SET_PHOTO,
        payload: photo,
    };
}

export function setPhotoLoading(loading: boolean): SetPhotoLoadingAction {
    return {
        type: SET_PHOTO_LOADING,
        payload: loading,
    };
}

export function fetchPhoto(photoId: string): ThunkAction<Promise<void>, AppState, string, AppTypes> {
    return async function(dispatch, getState) {
        try {
            let photo = getState().photo;

            if (photo && photo.photo && photo.photo.id === photoId) {
                return;
            }

            dispatch(setPhotoLoading(true));

            let response = await fetch('/api/photo/' + photoId);
            let data: PhotoState = await response.json();

            dispatch(setPhoto(data));
        } finally {
            dispatch(setPhotoLoading(false));
        }
    };
}
