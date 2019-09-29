import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';
import { SET_PHOTOS, SetPhotosAction } from 'store/photos/types';

export function setPhotos(photos: UnsplashPhoto[]): SetPhotosAction {
    return {
        type: SET_PHOTOS,
        payload: photos,
    };
}
