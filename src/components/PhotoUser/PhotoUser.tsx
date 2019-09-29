import * as React from 'react';

import { cn } from '@bem-react/classname';
import { UnsplashUser } from 'schema/Unsplash/UnsplashUser';
import { Avatar } from 'components/Avatar/Avatar';
import { UserLink } from 'components/UserLink/UserLink';

import 'components/PhotoUser/PhotoUser.scss';

const cnPhotoUser = cn('PhotoUser');

export interface PhotoUserProps {
    user: UnsplashUser;
    className?: string;
    tag?: string;
}

export const PhotoUser: React.FC<PhotoUserProps> = function PhotoUser({ className, tag, user }: PhotoUserProps) {
    return (
        <div className={cnPhotoUser(null, [className])}>
            <Avatar src={user.profile_image.medium} alt={user.username} className={cnPhotoUser('Avatar')} />

            <div className={cnPhotoUser('Info')}>
                <UserLink className={cnPhotoUser('User', { tag: Boolean(tag) })} user={user} />

                {tag && <span className={cnPhotoUser('Tag')}>{tag}</span>}
            </div>
        </div>
    );
};
