import { Link } from "react-router-dom";
import DeleteSpot from "./DeleteSpot";
import "./Spots.css";

const ManageSpotCard = ({ spot }) => {
    if (spot.previewImage === 'no image found' || spot.previewImage === 'image testing url') {
        spot.previewImage = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png'
    }

    return (
        <div className='spot_card'>
            <div>
                <img src={spot.previewImage} alt='preview' className='spot_card_image'></img>
            </div>

            <div className='spot_card_name_rating'>
                {spot.city}, {spot.state}
                <div>
                    <i className='fa-solid fa-star' style={{ marginRight: "5px" }}></i>
                    {spot.avgRating}
                </div>

            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                <div><span style={{ fontWeight: "bold" }}>${spot.price}</span> night</div>
                <div>
                    <Link to={`/spots/${spot.id}/edit`}>
                        <button type='button'>Update</button>
                    </Link>
                    <span>
                        <DeleteSpot spot={spot} />
                    </span>

                </div>

            </div>


        </div >
    );
}

export default ManageSpotCard;
