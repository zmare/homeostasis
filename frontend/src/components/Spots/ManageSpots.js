import ManageSpotCard from "./ManageSpotCard";
import { getSpotsUser } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Spots.css"

const ManageSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotsUser())
    }, [dispatch])

    let spots = useSelector(state => state.spots.current);
    if (!spots) return;

    spots = Object.values(spots);

    return (
        <div style={{ fontFamily: "'Manrope', sans-serif", padding: '1em 4em' }}>
            <h2>Manage Your Spots</h2>
            <Link to='/spots/new'>
                <button className='create_new_spot_btn'>Create a New Spot</button>
            </Link>

            <div className='spot_container_manage'>
                {spots.map((spot) => (
                    // <NavLink id={`spot-card-${spot.id}`} className='spot_card_link' key={spot.id} to={`/spots/${spot.id}`}>
                    //     <ManageSpotCard key={spot.id} spot={spot} />
                    // </NavLink>

                    <ManageSpotCard key={spot.id} spot={spot} />
                ))}
            </div>
        </div >
    );
}

export default ManageSpots;
