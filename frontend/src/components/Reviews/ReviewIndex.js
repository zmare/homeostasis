import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, getReviewsCurrent } from '../../store/reviews';
import ReviewCard from "./ReviewCard";
import OpenModalButton from '../OpenModalButton';
import ReviewSpotModal from "../ReviewSpotModal";
import './ReviewsIndex.css';

const ReviewIndex = ({ spot }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spot.id));
        dispatch(getReviewsCurrent());
    }, [dispatch])

    let reviews = useSelector(state => (state.reviews.orderedList));
    let myReviews = useSelector(state => (state.reviews.user));
    const user = useSelector(state => state.session.user);
    const ownerId = spot.Owner.id;

    if (!reviews) return null;
    if (!myReviews) return null;
    if (!spot.avgStarRating) spot.avgStarRating = 'New';

    reviews = Object.values(reviews);
    myReviews = Object.values(myReviews);
    let hasReview = false;

    for (let review of myReviews) {
        if (review.spotId === spot.id) hasReview = true;
    }

    return (
        <>
            <div className='review_rating_num'>
                {spot.avgStarRating === "New" ? (
                    <p>
                        <i className='fa-solid fa-star fa-fw'></i>
                        New
                    </p>
                ) : (
                    <>
                        <p>
                            <i className='fa-solid fa-star fa-fw'></i>
                            {spot.avgStarRating}
                        </p>
                        <p>·</p>
                        <p>{spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</p>
                    </>
                )}

            </div>

            {user !== null && spot.avgStarRating === 'New' && (user.id !== ownerId) ? (
                <OpenModalButton
                    className="test"
                    buttonText="Be the first to post a review!"
                    modalComponent={<ReviewSpotModal spot={spot} />}
                />
            ) : (user !== null && user.id !== ownerId && !hasReview) ? (
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewSpotModal spot={spot} />}
                />
            ) : ''}

            <div>
                <ReviewCard reviews={reviews} />
            </div>
        </>

    );

}


export default ReviewIndex;
