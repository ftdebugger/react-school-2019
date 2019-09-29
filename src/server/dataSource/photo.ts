import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { unsplashClient } from 'server/dataSource/unsplash';
import { toJson } from 'unsplash-js';
import { PhotoState } from 'store/photo/types';

export async function getPhotoState(photoId: string): Promise<PhotoState> {
    let [photoResponse, relatedResponse] = await Promise.all([
        unsplashClient.photos.getPhoto(photoId),
        // @ts-ignore
        unsplashClient.request({
            url: `/photos/${photoId}/related`,
            method: 'GET',
            query: {},
        }),
    ]);

    return {
        photo: await toJson(photoResponse),
        related: (await toJson(relatedResponse)).results,
    };
}

export async function getPhoto(router: RouterState): Promise<Partial<AppState>> {
    if (!router) {
        throw new Error('Router is not defined');
    }

    return {
        router,
        photo: await getPhotoState(router.params.id),
    };
}
