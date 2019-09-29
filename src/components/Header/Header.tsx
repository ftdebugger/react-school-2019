import * as React from 'react';

import { cn } from '@bem-react/classname';

import { Link } from 'react-router-dom';

import 'components/Header/Header.scss';

const cnHeader = cn('Header');

export interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = function Header({ className }: HeaderProps) {
    return (
        <header className={cnHeader(null, [className])}>
            <Link to="/" className={cnHeader('Link')}>
                ШРИ
            </Link>
        </header>
    );
};
