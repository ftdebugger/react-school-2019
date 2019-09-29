import * as React from 'react';

import { cn } from '@bem-react/classname';

import 'components/Avatar/Avatar.scss';

const cnAvatar = cn('Avatar');

export interface AvatarProps {
    src: string;
    alt: string;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = function Avatar({ src, alt, className }: AvatarProps) {
    return (
        <div className={cnAvatar(null, [className])}>
            <img src={src} alt={alt} className={cnAvatar('Image')} />
        </div>
    );
};
