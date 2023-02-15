import SpotForm from './SpotForm';

const CreateSpotForm = () => {
    const spot = {
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        description: '',
        name: '',
        price: ''
    };

    return (
        <SpotForm spot={spot} formType="Create Your Spot" />
    );
}

export default CreateSpotForm;
