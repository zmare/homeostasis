import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import MapBox from '../MapBox';
import SpotCard from './SpotCard';
import './Spots.css'

const SpotIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots.allSpots)
    if (!spots) return null;
    spots = Object.values(spots);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {/* <div className="spot_container_parent"> */}
                <div className='spot_container'>
                    {spots.map(spot => (
                        <NavLink id={`spot-card-${spot.id}`} className='spot_card_link' key={spot.id} to={`/spots/${spot.id}`}>
                            <SpotCard spot={spot} />
                        </NavLink>
                    ))}
                </div>
                {/* </div> */}
                <div style={{ marginTop: '40px', display: 'inline-block', right: '50px' }}>
                    <MapBox />
                </div>
            </div>

            <div>
                <p>footer</p>
            </div>
        </div>


    );
}

export default SpotIndex;
