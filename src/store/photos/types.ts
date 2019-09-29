import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';

export const SET_PHOTOS = 'SET_PHOTOS';

export interface SetPhotosAction {
    type: typeof SET_PHOTOS;
    payload: PhotosState;
}

export type PhotosState = UnsplashPhoto[] | undefined | null;

export type PhotosTypes = SetPhotosAction;
