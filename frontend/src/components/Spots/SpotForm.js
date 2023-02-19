import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSpot, getSpots } from '../../store/spots';
import './Spots.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newSpot, setNewSpot] = useState(spot);
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const newArray = new Array(5).fill('')

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    const handleUpdate = async (e) => {
        if (e.target.type === 'number') {
            setNewSpot({ ...newSpot, [e.target.name]: +e.target.value })
        } else {
            setNewSpot({ ...newSpot, [e.target.name]: e.target.value })
        }
    }

    const validateForm = () => {
        let err = {};

        if (newSpot.address === '') {
            err.address = 'Address is required';
        }

        if (newSpot.city === '') {
            err.city = 'City is required';
        }

        if (newSpot.state === '') {
            err.state = 'State is required';
        }

        if (newSpot.country === '') {
            err.country = 'Country is required';
        }

        if (newSpot.description === '' || newSpot.description.length < 30) {
            err.description = 'Description needs a minimum of 30 characters';
        }

        if (newSpot.name === '') {
            err.name = 'Name is required';
        }

        if (newSpot.price === '') {
            err.price = 'Price is required';
        }

        if (newSpot.previewImage === '') {
            err.previewImage = 'Preview Image is required';
        } else if (!(newSpot.previewImage.endsWith('.jpg') || newSpot.previewImage.endsWith('.jpeg') || newSpot.previewImage.endsWith('.png'))) {
            err.previewImage = 'Preview Image must end in .jpg, .jpeg, or .png';
        }

        setFormErrors({ ...err });

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = validateForm();

        setErrors([]);
        try {
            let createdSpot = await dispatch(addSpot(newSpot));
            if (createdSpot) {
                history.push(`/spots/${createdSpot.id}`)
            }
        } catch (response) {
            window.scrollTo(0, 0);
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors)
        }
    }



    return (
        <form className='form_parent_container' onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <ul className='errors'>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>

                <label>
                    Street Address
                    <input
                        placeholder='Address'
                        type="text"
                        name="address"
                        onChange={handleUpdate}
                        value={newSpot["address"]}
                    />
                    <span className='errors'>{formErrors.address}</span><br></br>
                </label>
                <label>
                    City
                    <input
                        placeholder="City"
                        type="text"
                        name="city"
                        onChange={handleUpdate}
                        value={newSpot["city"]}
                    />
                    <span className='errors'>{formErrors.city}</span><br></br>
                </label>
                <label>
                    State
                    <input
                        placeholder="State"
                        type="text"
                        name="state"
                        onChange={handleUpdate}
                        value={newSpot["state"]}

                    />
                    <span className='errors'>{formErrors.state}</span><br></br>
                </label>
                <label>
                    Country
                    <input
                        placeholder='Country'
                        type="text"
                        name="country"
                        onChange={handleUpdate}
                        value={newSpot["country"]}
                    />
                    <span className='errors'>{formErrors.country}</span><br></br>
                </label>
                <label>
                    Latitude
                    <input
                        placeholder="Latitude"
                        type="text"
                        name="lat"
                        onChange={handleUpdate}
                        value={newSpot["lat"]}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        placeholder="Longitude"
                        type="text"
                        name="lng"
                        onChange={handleUpdate}
                        value={newSpot["lng"]}
                    />
                </label>
            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood</p>

                <label>
                    <textarea
                        placeholder="Please write at least 30 characters"
                        type="text"
                        name="description"
                        onChange={handleUpdate}
                        value={newSpot['description']}
                        minLength='30'
                    />
                    <span className='errors'>{formErrors.description}</span><br></br>
                </label>
            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special. </p>

                <label>
                    <input
                        placeholder="Name of your spot"
                        type="text"
                        name="name"
                        onChange={handleUpdate}
                        value={newSpot['name']}
                    />
                    <span className='errors'>{formErrors.name}</span><br></br>
                </label>
            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
                <label>
                    $ <input
                        placeholder="Price per night (USD)"
                        type="text"
                        name="price"
                        onChange={handleUpdate}
                        value={newSpot["price"]}
                    />
                    <span className='errors'>{formErrors.price}</span><br></br>
                </label>

            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Liven your spot up with photos</h3>
                <p>Submit a link to atleast one photo to publish your spot</p>
                <label>

                    <input
                        placeholder='Preview Image URL ending in .jpg, .jpeg. or .png'
                        // required pattern='(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|jpeg|png))(?:\?([^#]*))?(?:#(.*))?'
                        title="please enter a valid URL"
                        onChange={handleUpdate}
                        name='previewImage'
                        value={newSpot['previewImage']}

                    >
                    </input>
                    <span className='errors'>{formErrors.previewImage}</span><br></br>
                </label>
                <br></br>
                {newArray.slice(1).map((arr, index) => (
                    <div key={index + 1}>
                        <input
                            placeholder='Image URL'>
                        </input>
                        <br></br>
                        <br></br>
                    </div>
                ))}
            </div>


            <button type='submit'>Create</button>
        </form>

    )
}

export default SpotForm;
