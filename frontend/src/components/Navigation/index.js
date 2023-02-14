import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const createNewSpot = () => {

    }

    return (
        <div className='header'>
            <li>
                <NavLink exact to="/">homeostasis</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <Link to="/spots/new">Create new spot</Link>
                    <ProfileButton user={sessionUser} />
                </li>

            )}
        </div>
    );
}

export default Navigation;
