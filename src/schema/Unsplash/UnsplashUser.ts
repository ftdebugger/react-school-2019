export interface UnsplashUser {
    id: string;
    bio: string;
    first_name: string;
    username: string;
    name: string;

    profile_image: {
        small: string;
        medium: string;
        large: string;
    };

    links: {
        followers: string;
        following: string;
        html: string;
        likes: string;
        photos: string;
        portfolio: string;
        self: string;
    };
}
