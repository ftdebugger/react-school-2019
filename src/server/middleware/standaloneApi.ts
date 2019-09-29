import { Request, Response, NextFunction, Handler } from 'express';

import { getPhotosState } from 'server/dataSource/photos';
import { getPhotoState } from 'server/dataSource/photo';

export function photosApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await getPhotosState());
        } catch (err) {
            next(err);
        }
    };
}

export function photoApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await getPhotoState(req.params.id));
        } catch (err) {
            next(err);
        }
    };
}
