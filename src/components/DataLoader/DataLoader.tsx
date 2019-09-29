import * as React from 'react';

import { withRouter, RouteComponentProps, Switch } from 'react-router';
import { RouterParams } from 'store/router/types';
import { useDispatch } from 'react-redux';
import { fetchRoute } from 'store/router/actions';

export interface DataLoaderProps {
    children: React.ReactNode;
}

export const DataLoader = withRouter(function DataLoader({
    children,
    location,
}: DataLoaderProps & RouteComponentProps<RouterParams>) {
    let [prevLocation, setPrevLocation] = React.useState(location);
    let [hasError, setError] = React.useState(false);
    let dispatch = useDispatch();

    React.useEffect(() => {
        // Location, was changed. We need to load data
        if (location !== prevLocation) {
            // @ts-ignore Dispatch thinks we return ThunkAction, but promise will be returned
            let result: Promise<void> = dispatch(fetchRoute(location.pathname));

            result
                .then(() => {
                    if (hasError) {
                        setError(false);
                    }

                    window.scrollTo(0, 0);
                    setPrevLocation(location);
                })
                .catch(error => {
                    console.error(error);
                    setError(true);
                });
        }
    }, [prevLocation, location, hasError]);

    if (hasError) {
        return <h1>Error loading data</h1>;
    }

    return <Switch location={prevLocation}>{children}</Switch>;
});
