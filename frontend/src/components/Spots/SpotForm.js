import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addSpot, getSpots } from '../../store/spots';
import { restoreUser } from '../../store/session';
import { csrfFetch } from '../../store/csrf';

import './Spots.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newSpot, setNewSpot] = useState({});

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

        let createdSpot = await dispatch(addSpot(newSpot));

        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    return (
        <form className='form_test' onSubmit={handleSubmit}>
            <h2>{formType}</h2>
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
            <label>
                Name
                <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={handleUpdate}
                    value={newSpot['name']}
                />
            </label>
            <label>
                Description
                <textarea
                    placeholder="Description"
                    type="text"
                    name="description"
                    onChange={handleUpdate}
                    value={newSpot['description']}
                />
            </label>
            <label>
                Price
                <input
                    placeholder="Price"
                    type="text"
                    name="price"
                    onChange={handleUpdate}
                    value={newSpot["price"]}
                />
            </label>

            <input type="submit" />
        </form>

    )
}

export default SpotForm;
