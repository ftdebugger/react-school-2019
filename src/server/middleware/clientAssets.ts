import { Request, Response, NextFunction, Handler } from 'express';

import { readFile } from 'fs';
import { join } from 'path';
import { getRoute } from 'selectors/getRoute/getRoute';

const DEFAULT_CSS = 'main.css';
const DEFAULT_JS = 'main.js';

function readManifest(): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
        readFile(join(__dirname, 'asset-manifest.json'), { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(new Error('Client assets not ready'));
            } else {
                try {
                    resolve(JSON.parse(data).files);
                } catch (err) {
                    reject(new Error('Cannot parse client assets manifest'));
                }
            }
        });
    });
}

export function clientAssets(): Handler {
    let files: Record<string, string> | undefined;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!files) {
                files = await readManifest();
            }

            if (!files) {
                throw new Error('Cannot find assets');
            }

            let getFiles = (names: string[]) => names.map(name => files && files[name]).filter(Boolean) as string[];
            let route = getRoute(req.state.state);

            req.state.files = files;
            req.state.css = getFiles([DEFAULT_CSS, `page.${route}.css`]);
            req.state.js = getFiles([`page.${route}.js`, DEFAULT_JS]);

            if (process.env.NODE_ENV !== 'production') {
                files = undefined;
            }

            next();
        } catch (err) {
            console.log(err);

            res.status(500).end();
        }
    };
}
