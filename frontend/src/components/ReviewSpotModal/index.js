import './ReviewSpot.css';
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../store/reviews';

const ReviewSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    let user = useSelector(state => state.session.user);

    const { closeModal } = useModal();
    let array = new Array(5).fill('');

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newReview = { review, stars };
        try {
            await dispatch(addReview(spot.id, user, newReview));
            closeModal();
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }

    }

    return (
        <div className='form-parent-container'>
            <form>
                <h2>How was your stay?</h2>
                <ul style={{ color: 'red', fontSize: '11pt' }}>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <textarea rows='5' cols='5'
                    placeholder="Leave review here..."
                    value={review}
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
                    disabled={review.length < 10}
                    onClick={handleSubmit}>Submit Your Review</button>
            </form>
        </div >
    );
}

export default ReviewSpotModal;
