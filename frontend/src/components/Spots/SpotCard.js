import { useState, useEffect } from 'react';
import "./Spots.css";

const SpotCard = ({ spot }) => {
    if (spot.previewImage === 'no image found' || spot.previewImage === 'image testing url') {
        spot.previewImage = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png'
    }

    if (spot.avgRating === 'no reviews yet') spot.avgRating = 'New';

    const [like, setLike] = useState(false)

    const handleLike = (e) => {
        e.preventDefault();
        setLike(!like);

        //if (like){
        // add like
        // } else remove like

    }
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
            <div className='spot_card_price_heart'>
                <span><span className='spot_card_price'>${spot.price}</span> night</span>
                <button className="show-like" onClick={handleLike}>
                    {
                        like ?
                            <i class="fa-solid fa-heart"></i>
                            :
                            <i className="fa-regular fa-heart"></i>

                    }
                </button>
            </div>
        </div >
    );
}

export default SpotCard;
