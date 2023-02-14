import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpotForm from './SpotForm';

const EditSpotForm = () => {
    //const spots = useSelector(state => state.spots.allSpots);
    const { spotId } = useParams();
    // const spot = spots[spotId];

    const spot = '';
    console.log(spotId);
    //console.log(spots);


    return (
        <SpotForm spot={spot} formType="Edit Your Spot" />
    );
}

export default EditSpotForm;
