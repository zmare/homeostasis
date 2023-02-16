import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot, getSpotsUser } from "../../store/spots";
import { useModal } from "../../context/Modal";


const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal, setOnModalClose } = useModal();



    const handleDelete = () => {
        dispatch(deleteSpot(spot.id))
            .then(closeModal);
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

export default DeleteSpotModal;
