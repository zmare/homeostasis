import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFavoritesCurrent } from '../../store/favorites';
import { getSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import './Spots.css'

const SpotIndex = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSpots())
        if (user) {
            dispatch(getFavoritesCurrent())
        }

    }, [dispatch, user])

    let spots = useSelector(state => state.spots.allSpots)
    let favorites = useSelector(state => state.favorites.allFavorites)
    if (!spots) return null;
    spots = Object.values(spots);

    const isFavorite = (spot) => {
        if (favorites) {
            favorites = Object.values(favorites);

            for (let favorite of favorites) {
                if (favorite.Spot.id === spot.id) return true
            }

            return false;
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <div className='spot_container'>
                    {spots.map(spot => (
                        <NavLink id={`spot-card-${spot.id}`} className='spot_card_link' key={`spotcard - ${spot.id}`} to={`/spots/${spot.id}`}>
                            <SpotCard spot={spot} isFavorite={isFavorite(spot)} />
                        </NavLink>

                    ))}
                </div>
            </div>

            <div className="page-footer-container">
                <div className='page-footer-column'>
                    <span className='column-header'>Tech Stack - Frontend</span>
                    <div id='column-1'>
                        <li>Javascript</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>HTML5</li>
                        <li>CSS3</li>
                    </div>
                </div>

                <div className='page-footer-column'>
                    <span className='column-header'>Tech Stack - Backend</span>
                    <div id='column-2'>
                        <li>Express</li>
                        <li>Sequelize</li>
                        <li>SQLite3</li>
                    </div>
                </div>

                <div className='page-footer-column'>
                    <span className='column-header'>Connect</span>
                    <div id='column-3'>
                        <a className="link" id='link-1' href='https://www.linkedin.com/in/zaineb-marediya/' target="_blank"><i id='connect' className="fa-brands fa-linkedin"></i></a>
                        <a className='link' href="https://github.com/zmare" target="_blank"><i id='connect' className="fa-brands fa-github"></i></a>
                        <a className='link' href="https://zmare.github.io/" target="_blank"><i id='connect' className="fa-solid fa-circle-user"></i></a>
                    </div>
                </div>

            </div>
        </div >


    );
}

export default SpotIndex;
