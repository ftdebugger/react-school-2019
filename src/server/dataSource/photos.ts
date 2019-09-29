import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { unsplashClient } from 'server/dataSource/unsplash';
import { toJson } from 'unsplash-js';
import { PhotosState } from 'store/photos/types';

export async function getPhotosState(): Promise<PhotosState> {
    let response = await unsplashClient.photos.listPhotos();

    return await toJson(response);
}

export async function getPhotos(router: RouterState): Promise<Partial<AppState>> {
    return {
        router,
        photos: await getPhotosState(),
    };
}
