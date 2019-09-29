import * as React from 'react';
import { cn } from '@bem-react/classname';

import { AppState } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { PhotoTeaser } from 'components/PhotoTeaser/PhotoTeaser';
import { Photos } from 'components/Photos/Photos';
import { RouteComponentProps } from 'react-router';
import { RouterParams } from 'store/router/types';
import { fetchPhoto } from 'store/photo/actions';

import 'components/Section/PhotoSection/PhotoSection.scss';

const cnPhotoSection = cn('PhotoSection');

export interface PhotoSectionProps extends RouteComponentProps<RouterParams> {}

export default function PhotoSection(props: PhotoSectionProps) {
    let [hasError, setError] = React.useState(false);
    let photo = useSelector((state: AppState) => state.photo.photo);
    let related = useSelector((state: AppState) => state.photo.related);
    let dispatch = useDispatch();
    let currentId = props.match.params.id;
    let isValidPhoto = photo && (photo.id === currentId && currentId);

    React.useEffect(() => {
        async function fetchData() {
            return dispatch(fetchPhoto(currentId));
        }

        if (!isValidPhoto) {
            fetchData().catch(error => {
                console.error(error);
                setError(true);
            });
        }
    }, [isValidPhoto]);

    if (!isValidPhoto) {
        return <h1>Loading...</h1>;
    }

    if (hasError) {
        return <h1>Error loading data</h1>;
    }

    return (
        <section className={cnPhotoSection()}>
            {photo && <PhotoTeaser photo={photo} />}

            {related && related.length > 0 && (
                <>
                    <h2 className={cnPhotoSection('Title')}>Похожие картинки</h2>

                    <Photos photos={related} />
                </>
            )}
        </section>
    );
}
