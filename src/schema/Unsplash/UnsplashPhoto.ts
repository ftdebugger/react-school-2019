import { UnsplashUser } from 'schema/Unsplash/UnsplashUser';

export interface UnsplashPhoto {
    id: string;
    alt_description: string;
    color: string;
    created_at: string;
    description: string | null;
    height: number;
    width: number;
    liked_by_user: boolean;

    user: UnsplashUser;

    sponsorship?: {
        tagline: string;
    };

    links: {
        download: string;
        download_location: string;
        html: string;
        self: string;
    };

    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };

    related_collections: {
        results: { id: number }[];
    };
}
