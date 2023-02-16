import React, { useState, useEffect, cloneElement } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";


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
        <div>
            <div>
                <h1 >Confirm Delete</h1>
            </div>
            <div>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>


    )
}

export default DeleteReviewModal;
