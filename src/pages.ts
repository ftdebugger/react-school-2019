import { Routes } from 'routes';

import { RouteProps } from 'react-router';
import { lazyComponent, lazyComponentBabel } from 'components/Lazy/Lazy';
import * as React from 'react';

export const PAGES: Record<Routes, RouteProps> = {
    [Routes.HOME]: {
        exact: true,
        path: '/',
        component: lazyComponent({
            async asyncLoader() {
                if (typeof window === 'object') {
                    return import(/* webpackChunkName: "page.home" */ 'components/Section/HomeSection/HomeSection');
                }

                return { default: React.Fragment };
            },
            syncLoader() {
                if (typeof window === 'undefined') {
                    return require('components/Section/HomeSection/HomeSection');
                }
            },
            // @ts-ignore
            id: require.resolveWeak('components/Section/HomeSection/HomeSection'),
        }),
    },

    // This imports will be processed by babel plugin
    [Routes.PHOTO]: {
        path: '/photo/:id',

        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.photo" */ 'components/Section/PhotoSection/PhotoSection'),
        ),
    },

    [Routes.NOT_FOUND]: {
        component: lazyComponentBabel(() =>
            import(/* webpackChunkName: "page.notFound" */ 'components/Section/NotFoundContent/NotFoundContent'),
        ),
    },
};
