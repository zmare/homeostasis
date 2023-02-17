import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";

const ReviewCard = ({ reviews }) => {

    reviews.forEach(review => {
        let newDate = new Date(review.createdAt);
        newDate = newDate.toDateString();
        review.createdAt = newDate;
        review.month = review.createdAt.split(' ')[1];
        review.year = review.createdAt.split(' ')[3];
    });

    return (
        <div>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.User.firstName}<br></br>
                        {/* {review.createdAt.split('T')[0]} <br></br> */}
                        <span style={{ color: "darkgray", fontSize: '10pt' }}>{review.month} {review.year}</span>  <br></br>
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
