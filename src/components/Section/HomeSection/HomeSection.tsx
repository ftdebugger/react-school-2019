import * as React from 'react';
import { cn } from '@bem-react/classname';

import { AppState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { Photos } from 'components/Photos/Photos';
import { setPhotos } from 'store/photos/actions';
import { UnsplashPhoto } from 'schema/Unsplash/UnsplashPhoto';

import 'components/Section/HomeSection/HomeSection.scss';

const content = cn('HomeSection');

export interface HomeSectionProps {}

export default function HomeSection({  }: HomeSectionProps) {
    let [hasError, setError] = React.useState(false);
    let photos = useSelector((state: AppState) => state.photos);
    let dispatch = useDispatch();

    React.useEffect(() => {
        async function fetchData() {
            let response = await fetch('/api/photos');
            let photos: UnsplashPhoto[] = await response.json();

            dispatch(setPhotos(photos));
        }

        if (!photos) {
            fetchData().catch(error => {
                console.error(error);
                setError(true);
            });
        }
    }, [photos]);

    if (hasError) {
        return <h1>Error loading data</h1>;
    }

    return <div className={content()}>{photos && <Photos photos={photos} />}</div>;
}
