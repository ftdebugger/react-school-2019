import * as React from 'react';

import { cn } from '@bem-react/classname';

import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';
import { PhotoTeaser } from 'components/PhotoTeaser/PhotoTeaser';

import 'components/Photos/Photos.scss';

const cnPhotos = cn('Photos');

export interface PhotosProps {
    photos: UnsplashPhoto[];
}

export const Photos: React.FC<PhotosProps> = function Photos({ photos }: PhotosProps) {
    return (
        <div className={cnPhotos()}>
            {photos.map(photo => (
                <PhotoTeaser className={cnPhotos('Photo')} key={photo.id} photo={photo} />
            ))}
        </div>
    );
};
