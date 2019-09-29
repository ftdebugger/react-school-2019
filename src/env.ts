import env from 'dotenv';

env.config();

const { UNSPLASH_APP_ACCESS_KEY, UNSPLASH_APP_SECRET } = process.env;

if (!UNSPLASH_APP_ACCESS_KEY || !UNSPLASH_APP_SECRET) {
    throw new Error('Configure unsplash access token. More information in Readme.md');
}

export { UNSPLASH_APP_ACCESS_KEY, UNSPLASH_APP_SECRET };
