import React from "react";
import DeleteSpotModal from "../DeleteSpotModal"
import OpenModalButton from "../OpenModalButton";

const DeleteSpot = ({ spot }) => {
    return (
        <div>
            <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
            />
        </div>
    )
}

export default DeleteSpot;
