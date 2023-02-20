import SpotForm from './SpotForm';

const CreateSpotForm = () => {
    const spot = {
        address: '',
        city: '',
        state: '',
        country: '',
        lat: 0,
        lng: 0,
        description: '',
        name: '',
        price: '',
        previewImage: '',
    };

    return (
        <SpotForm spot={spot} formType="Create Your Spot" />
    );
}

export default CreateSpotForm;
