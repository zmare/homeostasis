import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const linkStyle = {
        width: "100%",
        height: '70px',
        fontWeight: 400,
        textDecoration: 'none',
        fontSize: '20px',
        color: "red"
    }

    return (
        <div className='header'>
            <div>
                {/* <NavLink to="/">
                    <img src="https://www.clipartmax.com/png/full/48-488255_home-home-logo-png.png" alt='logo' style={{ height: "20px", width: '20px', marginRight: '5px' }}></img>
                </NavLink> */}
                <NavLink exact to="/" style={linkStyle}>homeostasis</NavLink>
            </div>
            {
                isLoaded && (
                    <div className='header-right'>
                        {sessionUser ? <NavLink to="/spots/new" style={{ textDecoration: 'none', color: "black" }}>Create new spot</NavLink> : null}
                        <ProfileButton user={sessionUser} />
                    </div>

                )
            }
        </div >
    );
}

export default Navigation;
