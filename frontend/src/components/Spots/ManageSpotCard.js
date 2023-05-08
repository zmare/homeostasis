import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFavorite, getFavoritesCurrent } from "../../store/favorites";
import DeleteSpot from "./DeleteSpot";
import "./Spots.css";

const ManageSpotCard = ({ spot, type }) => {
    const dispatch = useDispatch();

    const handleFavoriteDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteFavorite(spot.id))
        await dispatch(getFavoritesCurrent());
    }

    return (
        <div className='spot_card'>
            <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt='preview' className='spot_card_image'></img>
            </Link>

            <Link id={`spot-card-${spot.id}`} className='spot_card_name_rating spot_card_link' to={`/spots/${spot.id}`}>
                {spot.city}, {spot.state}
                <div>
                    <i className='fa-solid fa-star' style={{ marginRight: "5px" }}></i>
                    {spot.avgRating}
                </div>
            </Link>

            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <Link className='spot_card_link' style={{ width: '50%' }} to={`/spots/${spot.id}/edit`}><span style={{ fontWeight: "bold" }}>${spot.price}</span> night</Link>
                <div style={{
                    display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-between'
                }}>
                    {type === 'favorites' ?
                        <button onClick={handleFavoriteDelete} style={{ marginLeft: '19px' }} className='create_new_spot_btn'>Remove Favorite</button>
                        :
                        <>
                            <Link to={`/spots/${spot.id}/edit`}>
                                <button className="create_new_spot_btn" type='button'>Update</button>
                            </Link>

                            <Link to={`/spots/current`}>
                                <div><DeleteSpot spot={spot} /></div>
                            </Link>
                            {/* <DeleteSpot spot={spot} /> */}
                        </>

                    }

                </div>

            </div>


        </div >
    );
}

export default ManageSpotCard;
