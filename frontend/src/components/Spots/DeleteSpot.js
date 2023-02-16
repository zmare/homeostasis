import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from '../OpenModalButton';
import DeleteSpotModal from "../DeleteSpotModal"
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from 'react-router-dom'
import OpenModalButton from "../OpenModalButton";
import { getSpotsUser } from "../../store/spots";


const DeleteSpot = ({ spot }) => {
    const dispatch = useDispatch();

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
