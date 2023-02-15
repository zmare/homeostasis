import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spots';
import SpotFormUpdate from './SpotFormUpdate';

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    const spots = useSelector(state => state.spots.allSpots);
    if (!spots) return null;

    const spot = spots[spotId];

    return (
        <SpotFormUpdate spot={spot} formType="Edit Your Spot" />
    );
}

export default EditSpotForm;
