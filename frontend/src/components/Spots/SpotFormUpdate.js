import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editSpot } from '../../store/spots';



import './Spots.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    console.log(spotId);

    const [newSpot, setNewSpot] = useState({});

    const handleUpdate = async (e) => {
        if (e.target.type === 'number') {
            setNewSpot({ ...newSpot, [e.target.name]: +e.target.value })
        } else {
            setNewSpot({ ...newSpot, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedSpot = await dispatch(editSpot(spotId, newSpot));

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    const defineValue = (name) => {
        if (newSpot[name]) {
            return newSpot[name];
        } else return spot.name;
    }

    return (
        <form className='form_test' onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <label>
                Country
                <input
                    placeholder={spot.country}
                    type="text"
                    name="country"
                    onChange={handleUpdate}
                    value={newSpot.country}
                />
            </label>
            <label>
                Street Address
                <input
                    placeholder={spot.address}
                    type="text"
                    name="address"
                    onChange={handleUpdate}
                    value={defineValue('address')}

                />
            </label>
            <label>
                City
                <input
                    placeholder={spot.city}
                    type="text"
                    name="city"
                    onChange={handleUpdate}
                    value={defineValue('city')}
                />
            </label>
            <label>
                State
                <input
                    placeholder={spot.state}
                    type="text"
                    name="state"
                    onChange={handleUpdate}
                    value={defineValue('state')}
                />
            </label>
            <label>
                Longitude
                <input
                    placeholder={spot.lng}
                    type="text"
                    name="lng"
                    onChange={handleUpdate}
                    value={defineValue('lng')}
                />
            </label>
            <label>
                Latitude
                <input
                    placeholder={spot.lat}
                    type="text"
                    name="lat"
                    onChange={handleUpdate}
                    value={defineValue('lat')}
                />
            </label>
            <label>
                Name
                <input
                    placeholder={spot.name}
                    type="text"
                    name="name"
                    onChange={handleUpdate}
                    value={defineValue('name')}
                />
            </label>
            <label>
                Description
                <textarea
                    placeholder={spot.description}
                    type="text"
                    name="description"
                    onChange={handleUpdate}
                    value={defineValue('description')}
                />
            </label>
            <label>
                Price
                <input
                    placeholder={spot.price}
                    type="text"
                    name="price"
                    onChange={handleUpdate}
                    value={defineValue('price')}
                />
            </label>

            <input type="submit" />
        </form>

    )
}

export default SpotForm;
