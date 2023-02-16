import ManageSpotCard from "./ManageSpotCard";
import { getSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Spots.css"

const ManageSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    let allSpots = useSelector(state => state.spots.allSpots);
    const userId = useSelector(state => state.session.user.id);
    if (!allSpots) return null;
    if (!userId) return null;

    allSpots = Object.values(allSpots);
    const mySpots = allSpots.filter((spot) => spot.ownerId === userId);

    return (
        <div >
            <h2>Manage Your Spots</h2>
            <Link to='/spots/new'>
                <button>Create a New Spot</button>
            </Link>

            <div className='spotContainer'>
                {mySpots.map((spot) => (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <ManageSpotCard spot={spot} />
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default ManageSpots;
