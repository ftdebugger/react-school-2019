import Unsplash from 'unsplash-js';

import fetch from 'node-fetch';

import { UNSPLASH_APP_ACCESS_KEY, UNSPLASH_APP_SECRET } from 'env';

// @ts-ignore
global.fetch = fetch;

if (!UNSPLASH_APP_ACCESS_KEY || !UNSPLASH_APP_SECRET) {
    throw new Error('Configure unsplash access token. More information in Readme.md');
}

export const unsplashClient = new Unsplash({
    applicationId: UNSPLASH_APP_ACCESS_KEY,
    secret: UNSPLASH_APP_SECRET,
});
