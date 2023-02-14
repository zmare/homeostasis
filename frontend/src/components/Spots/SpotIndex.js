import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getSpots } from '../../store/spots';
import SpotCard from './SpotCard';

const SpotIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots.allSpots)
    if (!spots) return null;
    spots = Object.values(spots);

    return (
        <div>
            <ul>
                {
                    spots.map(spot => (
                        <div>
                            <NavLink to={`/spots/${spot.id}`}>
                                <SpotCard spot={spot} />
                            </NavLink>
                            <br></br>
                        </div>
                    ))
                }
            </ul >


        </div >
    );
}

export default SpotIndex;
