import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './DeleteReview.css'

const DeleteReviewModal = ({ review }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteReview(review.id))
        closeModal();
    }

    const handleNo = () => {
        closeModal();
    }

    return (
        <div className="form-parent-container">
            <div>
                <h1 >Confirm Delete</h1>
            </div>
            <div>
                <p>Are you sure you want to remove this review from the listing?</p>
            </div>
            <div className='yes_no_btns'>
                <span><button className='yes-btn' onClick={handleDelete}>Yes</button>
                </span>
                <span>
                    <button className='no-btn' onClick={handleNo}>No</button>
                </span>

            </div>
        </div>


    )
}

export default DeleteReviewModal;
