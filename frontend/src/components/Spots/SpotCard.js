import "./Spots.css";

const SpotCard = ({ spot }) => {
    if (spot.previewImage === 'no image found' || spot.previewImage === 'image testing url') {
        spot.previewImage = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png'
    }

    if (spot.avgRating === 'no reviews yet') spot.avgRating = 'New';

    return (
        <div className='spot_card'>
            <img src={spot.previewImage} alt='preview' className='spot_card_image'></img>
            <div className='spot_card_name_rating'>
                <span className='spot_card_name'>{spot.name.substring(0, 100)}</span>
                <div>
                    <i className='fa-solid fa-star spot_card_star_rating'></i>
                    {spot.avgRating}
                </div>
            </div>
            <span className='spot_card_price'>${spot.price}</span> night
        </div >
    );
}

export default SpotCard;
