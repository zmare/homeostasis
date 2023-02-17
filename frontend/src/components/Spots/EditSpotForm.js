import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';
import SpotFormUpdate from './SpotFormUpdate';

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.allSpots);


    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if (!spots) return null;
    const spot = spots[spotId];

    if (user === null || user.id !== spot.ownerId) {
        return <Redirect to="/" />
    }

    return (
        <SpotFormUpdate spot={spot} formType="Edit Your Spot" />
    );
}

export default EditSpotForm;
