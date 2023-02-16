import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from '../../store/reviews';
import ReviewCard from "./ReviewCard";
import OpenModalButton from '../OpenModalButton';
import ReviewSpotModal from "../ReviewSpotModal";

const ReviewIndex = ({ spot }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spot.id))
    }, [dispatch])

    let reviews = useSelector(state => (state.reviews.spot));
    if (!reviews) return null;

    reviews = Object.values(reviews);

    return (
        <>
            <p style={{ fontSize: '11pt' }}>
                <i className='fa-solid fa-star'></i>
                {spot.avgStarRating}</p>
            <p style={{ fontSize: '11pt', }}>{spot.numReviews} reviews</p>
            <OpenModalButton
                buttonText="Post Review"
                modalComponent={<ReviewSpotModal spot={spot} />}
            />
            <div>
                <ReviewCard reviews={reviews} />
            </div>
        </>

    );

}


export default ReviewIndex;
