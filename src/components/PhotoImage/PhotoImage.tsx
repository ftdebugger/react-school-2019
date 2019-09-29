import * as React from 'react';

import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';
import { cn } from '@bem-react/classname';

import 'components/PhotoImage/PhotoImage.scss';

const cnPhotoImage = cn('PhotoImage');

export interface PhotoImageProps {
    photo: UnsplashPhoto;
    alt: string;

    className?: string;
}

export const PhotoImage: React.FC<PhotoImageProps> = function PhotoImage({ photo, alt, className }: PhotoImageProps) {
    let ratio = photo.height / photo.width;

    if (!photo.urls) {
        return null;
    }

    return (
        <picture
            className={cnPhotoImage(null, [className])}
            style={{ minHeight: `${(ratio * 100).toFixed(1)}vw`, backgroundColor: photo.color }}
        >
            <source srcSet={photo.urls.full} media="(min-width: 640px)" />
            <source srcSet={photo.urls.small} media="(min-width: 320px)" />

            <img src={photo.urls.thumb} alt={alt} />
        </picture>
    );
};
