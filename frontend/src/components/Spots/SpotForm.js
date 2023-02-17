import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSpot, getSpots } from '../../store/spots';
import './Spots.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newSpot, setNewSpot] = useState(spot);
    const [errors, setErrors] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            let createdSpot = await dispatch(addSpot(newSpot));
            if (createdSpot) {
                history.push(`/spots/${createdSpot.id}`)
            }
        } catch (error) {

        }


        return dispatch(addSpot(newSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

    }

    return (
        <form className='form_parent_container' onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <ul style={{ color: 'red' }}>
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
                    />
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
                </label>
            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>
                <label>
                    $
                    <input
                        placeholder="Price per night (USD)"
                        type="text"
                        name="price"
                        onChange={handleUpdate}
                        value={newSpot["price"]}
                    />
                </label>
            </div>

            <div style={{ borderBottom: '1px solid black' }}>
                <h3>Liven your spot up with photos</h3>
                <p>Submit a link to atleast one photo to publish your spot</p>
                {newArray.map((arr) => (
                    <>
                        <input
                            placeholder='image url'>
                        </input>
                        <br></br>
                        <br></br>
                    </>
                ))}
            </div>


            <button type='submit'>Create</button>
        </form>

    )
}

export default SpotForm;
