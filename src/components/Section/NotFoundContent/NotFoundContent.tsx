import * as React from 'react';

import { cn } from '@bem-react/classname';

import 'components/Section/NotFoundContent/NotFoundContent.scss';

const content = cn('NotFoundContent');

export interface NotFoundContentProps {}

export const NotFoundContent: React.FC<NotFoundContentProps> = function NotFoundContent() {
    return (
        <div className={content()}>
            <h1 className={content('Title')}>Page not found</h1>
        </div>
    );
};

export default NotFoundContent;
