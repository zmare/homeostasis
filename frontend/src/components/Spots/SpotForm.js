import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { addSpot } from '../../store/spots';
import { restoreUser } from '../../store/session';
import { csrfFetch } from '../../store/csrf';

import './Spots.css'

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLatitude] = useState(1);
    const [lng, setLongitude] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spot = { country, address, city, state, lat, lng, description, name, price }
        console.log(spot);

        let newSpot = await dispatch(addSpot(spot));
        console.log(newSpot);

        if (newSpot) {
            history.push(`/spots/${newSpot.id}`)
        }
    }

    return (
        <form className='form_test' onSubmit={handleSubmit}>
            <h2>Create a new Spot</h2>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
            </label>
            <label>
                Street Address
                <input
                    value={address}
                    onChange={e => setStreetAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
            </label>
            {/* <label>
                Latitude
                <input
                    value={lat}
                    onChange={e => setLatitude(e.target.value)}
                />
            </label> */}
            <label>
                Longitude
                <input
                    value={lng}
                    onChange={e => setLongitude(e.target.value)}
                />
            </label>
            <label>
                Latitude
                <input
                    value={lat}
                    onChange={e => setLatitude(e.target.value)}
                />
            </label>
            <label>
                Name
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Description
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label>
                Price
                <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </label>

            <input type="submit" />
        </form>

    )
}

export default SpotForm;
