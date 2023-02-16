import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from 'react-router-dom'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className='dropdown'>
            <button onClick={openMenu} className='profile-menu-btn'>
                <i className="fa-sharp fa-solid fa-bars"></i>
                <i className="fa-sharp fa-solid fa-user fa-fw"></i>
            </button>
            <div className='dropdown-content'>
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <>
                            Hello {user.firstName}! <br></br>
                            {user.email} <br></br>
                            <NavLink to={`/spots/current`}>Manage Spots</NavLink>
                            <button className='logout-btn' onClick={logout}>Log Out</button>

                        </>
                    ) : (

                        <div style={{ listStyle: 'none' }}>

                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    )}
                </ul>
            </div>
        </div >
    );
}

export default ProfileButton;
