import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';

export const SET_PHOTO = 'SET_PHOTO';
export const SET_PHOTO_LOADING = 'SET_PHOTO_LOADING';

export interface SetPhotoAction {
    type: typeof SET_PHOTO;
    payload: PhotoState;
}

export interface SetPhotoLoadingAction {
    type: typeof SET_PHOTO_LOADING;
    payload: boolean;
}

export interface PhotoState {
    loading?: boolean;

    photo?: UnsplashPhoto;
    related?: UnsplashPhoto[];
}

export type PhotoTypes = SetPhotoAction | SetPhotoLoadingAction;
