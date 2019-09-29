import * as React from 'react';

import { cn } from '@bem-react/classname';
import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';
import { PhotoImage } from 'components/PhotoImage/PhotoImage';
import { PhotoUser } from 'components/PhotoUser/PhotoUser';
import { Link } from 'react-router-dom';

import 'components/PhotoTeaser/PhotoTeaser.scss';

const cnPhoto = cn('PhotoTeaser');

export interface PhotoTeaserProps {
    photo: UnsplashPhoto;
    className?: string;
}

export const PhotoTeaser: React.FC<PhotoTeaserProps> = function PhotoTeaser({ photo, className }: PhotoTeaserProps) {
    return (
        <div className={cnPhoto(null, [className])}>
            {photo.user && (
                <PhotoUser
                    user={photo.user}
                    className={cnPhoto('Owner')}
                    tag={photo.sponsorship && photo.sponsorship.tagline}
                />
            )}

            <Link to={`/photo/${photo.id}`} className={cnPhoto('Link')}>
                <PhotoImage photo={photo} alt={photo.alt_description} className={cnPhoto('Picture')} />
            </Link>

            {photo.description && <div className={cnPhoto('Description')}>{photo.description}</div>}
        </div>
    );
};
