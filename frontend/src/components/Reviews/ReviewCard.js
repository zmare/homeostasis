import { useSelector } from "react-redux";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewModal from "../EditReviewModal";
import OpenModalButton from "../OpenModalButton";

const ReviewCard = ({ spot, reviews }) => {
    const user = useSelector(state => state.session.user);

    if (!reviews.length) return;

    reviews.forEach(review => {
        let newDate = new Date(review.createdAt);
        newDate = newDate.toDateString();
        review.createdAt = newDate;
        review.month = review.createdAt.split(' ')[1];
        review.year = review.createdAt.split(' ')[3];
    });

    return (
        <div className='review_card_container'>
            {reviews.map(review => (
                <div key={review.id}>
                    <p>{review.User.firstName}<br></br>
                        <span style={{ color: "darkgray", fontSize: '10pt' }}>{review.month} {review.year}</span>  <br></br>
                        {review.review}
                    </p>
                    {(user !== null && user.id === review.User.id)
                        ?
                        (
                            <>
                                <span style={{ marginRight: '10px' }}>
                                    <OpenModalButton
                                        buttonText="Edit"
                                        modalComponent={<EditReviewModal review={review} />}
                                    />
                                </span>

                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal review={review} />}
                                />



                            </>
                        )
                        :
                        ''}

                </div>
            ))}
        </div>
    );
}

export default ReviewCard;
