import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import './Spots.css'

const SpotIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots.allSpots)
    if (!spots) return null;
    spots = Object.values(spots);

    return (
        <div className='spot_container'>
            {spots.map(spot => (
                <NavLink id={`spot-card-${spot.id}`} className='spot_card_link' key={spot.id} to={`/spots/${spot.id}`}>
                    <SpotCard spot={spot} />
                </NavLink>
            ))}


        </div>
    );
}

export default SpotIndex;
