import SpotForm from './SpotForm';

const CreateSpotForm = () => {
    const spot = {
        address: '',
        city: '',
        state: ''
    };

    return (
        <SpotForm spot={spot} formType="Create Your Spot" />
    );
}

export default CreateSpotForm;
