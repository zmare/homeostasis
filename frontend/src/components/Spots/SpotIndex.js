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
        <div className='spotContainer'>
            {spots.map(spot => (
                <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none', listStyle: 'none', fontColor: 'black' }}>
                    <SpotCard spot={spot} />
                </NavLink>
            ))}
        </div >
    );
}

export default SpotIndex;
