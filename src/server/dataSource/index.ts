import { RouterState } from 'store/router/types';
import { AppState } from 'store';
import { Routes } from 'routes';
import { getPhotos } from 'server/dataSource/photos';
import { getPhoto } from 'server/dataSource/photo';

export async function getData(router: RouterState): Promise<Partial<AppState>> {
    if (!router) {
        throw new Error(`Router is not defined`);
    }

    if (router.route === Routes.HOME) {
        return getPhotos(router);
    }

    if (router.route === Routes.PHOTO) {
        return getPhoto(router);
    }

    throw new Error(`Cannot find data for route "${router.route}"`);
}
