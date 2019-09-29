import * as React from 'react';
import { UnsplashUser } from 'schema/Unsplash/UnsplashUser';
import { cn } from '@bem-react/classname';

import 'components/UserLink/UserLink.scss';

const cnUserLink = cn('UserLink');

export interface UserLinkProps {
    user: UnsplashUser;
    className?: string;
}

export const UserLink: React.FC<UserLinkProps> = function UserLink({ user, className }: UserLinkProps) {
    return (
        <a href={user.links.html} className={cnUserLink(null, [className])} target="_blank" rel="noopener noreferrer">
            {user.name}
        </a>
    );
};
