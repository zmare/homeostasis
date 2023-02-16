const ReviewCard = ({ reviews }) => {

    return (
        <div>

            {reviews.map(review => (
                <div>
                    <p>{review.User.firstName}<br></br>
                        {review.createdAt.split('T')[0]} <br></br>
                        {review.review}
                    </p>
                    <button>Delete Review</button>
                </div>
            ))}

        </div>

    );
}

export default ReviewCard;
