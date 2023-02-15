import "./Spots.css";

const SpotCard = ({ spot }) => {
    if (spot.previewImage === 'no image found' || spot.previewImage === 'image testing url') {
        spot.previewImage = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png'
    }
    return (
        <div className='spot_card'>
            <img src={spot.previewImage} className='spot_image'></img>
            <div className='spot_card_loc_rating'>
                {spot.city}, {spot.state}
                <div>
                    <i className='fa-solid fa-star' style={{ marginRight: "5px" }}></i>
                    {spot.avgRating}
                </div>

            </div>
            <li><span style={{ fontWeight: "bold" }}>${spot.price}</span> night</li>

        </div >
    );
}

export default SpotCard;
