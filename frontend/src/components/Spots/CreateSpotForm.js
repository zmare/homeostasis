import SpotForm from './SpotForm';
import SpotFormFormik from './SpotFormFormik';

const CreateSpotForm = () => {
    const spot = {
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        name: '',
        price: '',
        previewImage: '',
    };

    return (
        <SpotForm spot={spot} formType="Create Your Spot" />
        //<SpotFormFormik spot={spot} formType="Create Your Spot" />
    );
}

export default CreateSpotForm;
