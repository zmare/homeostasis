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
        <div >
            <h2>Manage Your Spots</h2>
            <Link to='/spots/new'>
                <button>Create a New Spot</button>
            </Link>

            <div className='spot_container'>
                {spots.map((spot) => (

                    <ManageSpotCard key={spot.id} spot={spot} />

                ))}
            </div>
        </div>
    );
}

export default ManageSpots;
