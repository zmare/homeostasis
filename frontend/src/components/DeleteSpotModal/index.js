import React from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";


const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const handleDelete = () => {
        dispatch(deleteSpot(spot.id))
            .then(closeModal);
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
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className='yes_no_btns'>
                <span>
                    <button className='yes-btn' onClick={handleDelete}>Yes</button>
                </span>
                <span>
                    <button className='no-btn' onClick={handleNo}>No</button>
                </span>
            </div>
        </div>


    )
}

export default DeleteSpotModal;
