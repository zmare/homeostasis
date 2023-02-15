import ManageSpotCard from "./ManageSpotCard";
import { getSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
            <h2>Mangage Your Spots</h2>
            <button>Create a New Spot</button>
            <div className='spotContainer'>
                {mySpots.map((spot) => (
                    <ManageSpotCard key={spot.id} spot={spot} />
                ))}
            </div>
        </div>
    );
}

export default ManageSpots;
