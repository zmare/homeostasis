const ReviewCard = ({ reviews }) => {

    return (
        <ul>
            {reviews.map(review => (
                <div>
                    <li>{review.User.firstName}</li>
                    <li>{review.createdAt.split('T')[0]}</li>
                    <li>{review.review}</li>
                    <br></br>
                </div>
            ))}

        </ul>

    );
}

export default ReviewCard;
