import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getSpots } from '../../store/spots';
import SpotDetails from './SpotDetails';

const AllSpots = () => {
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
                            <ul>
                                <li>{spot.city}, {spot.state}</li>
                                <li>{spot.avgRating}</li>
                                <li>${spot.price} night</li>
                                <li>
                                    <NavLink to={`/spot/${spot.id}`}> Click for details
                                        <SpotDetails />
                                    </NavLink>
                                </li>
                                <br></br>

                            </ul>
                        </div>


                    ))
                }
            </ul>


        </div>
    );
}

export default AllSpots;
