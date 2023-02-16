import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";

const ReviewCard = ({ reviews }) => {

    return (
        <div>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.User.firstName}<br></br>
                        {review.createdAt.split('T')[0]} <br></br>
                        {review.review}
                    </p>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReviewModal review={review} />}
                    />
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;
