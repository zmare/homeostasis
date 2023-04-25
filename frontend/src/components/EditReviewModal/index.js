import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReview, getReviews, getReviewsCurrent } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './EditReview.css'

const EditReviewModal = ({ review }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let user = useSelector(state => state.session.user);
    let array = new Array(5).fill('');

    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState(review.stars);
    const [newReview, setReview] = useState(review.review);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            review: newReview,
            stars: +stars
        }

        try {
            await dispatch(editReview(review.id, user, updatedReview))
            await dispatch(getReviews(review.spotId))
            await dispatch(getReviewsCurrent())
            closeModal();
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <div className="form-parent-container">
            <form>
                <h2>How was your stay?</h2>
                <ul style={{ color: 'red', fontSize: '11pt' }}>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <textarea rows='5' cols='5'
                    placeholder="Leave review here..."
                    value={newReview}
                    onChange={(e) => setReview(e.target.value)}
                >
                </textarea>
                <div className='review_spot_stars'>
                    <div className='star-rating'>
                        {array.map((rating, index) => {
                            index += 1;

                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= stars ? 'fill' : 'no-fill'}
                                    onClick={() => setStars(index)}

                                >
                                    <span>
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                </button>

                            )
                        })} stars
                    </div>
                </div>
                <button className={review.length < 10 ? 'review-submit-disabled' : 'review-submit-button'}
                    type='submit'
                    disabled={newReview.length < 10}
                    onClick={handleSubmit}>Submit Your Review</button>
            </form>
        </div>


    )
}

export default EditReviewModal;
