import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpot } from '../../store/spots';
import ReviewIndex from '../Reviews/ReviewIndex';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getSpot(spotId));
    }, [dispatch]);

    const spot = useSelector(state => {
        if (state.spots.singleSpot === undefined) {
            return;
        } else {
            return state.spots.singleSpot[spotId]
        }
    });

    if (!spot) return null;

    return (
        <div>
            <ul>
                <li>{spot.name}</li>
                <li>
                    {spot.SpotImages.map(image =>
                        <img src={`${image.url}`}></img>
                    )}
                </li>
                <li>{spot.city}, {spot.state}, {spot.country}</li>
                <li>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</li>
                <li> {spot.description}</li>
                <li>${spot.price} night</li>
                <li>Rating: {spot.avgStarRating}</li>
                <li>{spot.numReviews} reviews</li>
            </ul>

            <div>
                <ReviewIndex spot={spot} />
            </div>
        </div >
    );
}

export default SpotDetail;
