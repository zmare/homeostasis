import './ReviewSpot.css';
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../store/reviews';

const ReviewSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    let user = useSelector(state => state.session.user);
    delete user.email;
    delete user.username;

    const { closeModal } = useModal();
    let array = new Array(5).fill('');

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = { review, stars };

        dispatch(addReview(spot.id, user, newReview));
        closeModal();
    }

    return (
        <div>
            <h2>How was your stay?</h2>
            <form>
                <textarea
                    placeholder="Leave review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                >
                </textarea>
                <div>
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
                <button
                    type='submit'
                    onClick={handleSubmit}>Submit Your Review</button>
            </form>
        </div>
    );
}

export default ReviewSpotModal;
