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
        <div style={{ padding: "2em", fontFamily: 'Manrope,sans serif' }}>
            <h2 style={{ fontWeight: "bolder" }}>{spot.name}</h2>
            <p style={{ fontWeight: 0 }}>{spot.city}, {spot.state}, {spot.country}</p>

            <div>
                {spot.SpotImages.map(image =>
                    <img style={{ objectFit: 'cover', width: '25%', height: '205px', padding: '10px' }} src={`${image.url}`}></img>
                )}
            </div>

            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p style={{ fontSize: '11pt', borderBottom: 'solid 2px lightgray' }}> {spot.description}</p>
            <div>
                <p style={{ fontSize: '11pt' }}><span style={{ fontWeight: "bold" }}>${spot.price}</span> night</p>
                <p style={{ fontSize: '11pt' }}>Rating: {spot.avgStarRating}</p>
                <p style={{ fontSize: '11pt', borderBottom: 'solid 2px lightgray' }}>{spot.numReviews} reviews</p>
            </div>

            <div>
                <ReviewIndex spot={spot} />
            </div>
        </div >
    );
}

export default SpotDetail;
