import { Request, Response, NextFunction, Handler } from 'express';

import { matchUrl } from 'server/utils/matchUrl';
import { getData } from 'server/dataSource';

export function routeApi(): Handler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            let router = matchUrl(req.query.url);

            if (!router) {
                return next(new Error(`Cannot match URL`));
            }

            res.json(await getData(router));
        } catch (err) {
            next(err);
        }
    };
}
