import ManageSpotCard from "./ManageSpotCard";
import { getSpots, getSpotsUser } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Spots.css"
import { getFavoritesCurrent } from "../../store/favorites";

const FavoriteSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavoritesCurrent())
    }, [dispatch])

    let favorites = useSelector(state => state.favorites.allFavorites);
    if (!favorites) return;

    favorites = Object.values(favorites);

    return (
        <div style={{ fontFamily: "'Manrope', sans-serif", padding: '1em 4em' }}>
            <h2>Your Favorite Spots</h2>

            <div className='spot_container_manage'>
                {favorites.map((favorite) => (
                    <ManageSpotCard key={favorite.Spot.id} spot={favorite.Spot} type='favorites' />
                ))}
            </div>
        </div >
    );
}

export default FavoriteSpots;
