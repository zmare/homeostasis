import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from '../../store/reviews';
import ReviewCard from "./ReviewCard";

const ReviewIndex = ({ spot }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spot.id))
    }, [dispatch])

    let reviews = useSelector(state => (state.reviews.spot));
    if (!reviews) return null;

    reviews = Object.values(reviews);

    return (
        <div>
            <ReviewCard reviews={reviews} />
        </div>
    );

}


export default ReviewIndex;
