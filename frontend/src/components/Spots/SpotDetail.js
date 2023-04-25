import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpot } from '../../store/spots';
import ReviewIndex from '../Reviews/ReviewIndex';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const testingReview = useSelector(state => state.reviews);


    useEffect(() => {
        dispatch(getSpot(spotId));
    }, [dispatch, spotId, testingReview]);

    const spot = useSelector(state => {
        if (state.spots.singleSpot === undefined) {
            return;
        } else {
            return state.spots.singleSpot[spotId]
        }
    });

    if (!spot) return null;
    if (!spot.avgStarRating) spot.avgStarRating = 'New';

    if (!spot.SpotImages.length) {
        spot.SpotImages[0] = { url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ghk010121homefeature-008-1671137680.png" }
    }

    const images = spot.SpotImages.slice(0, 5);

    return (
        <div className='spot_detail_container'>
            <h2 className='spot_detail_header'>{spot.name}</h2>
            <p >{spot.city}, {spot.state}, {spot.country}</p>
            {spot.SpotImages.length ? (
                <div className='spot_detail_images_container'>
                    <img id='spot_detail_img_1' className='spot_detail_images' src={images[0].url} alt='preview'></img>

                    {images.slice(1).map((image, index) =>
                        <img key={image.id} id={`spot_detail_img_${index + 2}`} className='spot_detail_images' src={`${image.url}`} alt='preview'></img>
                    )}
                </div>
            ) : ''}
            <h2 style={{ fontWeight: '400' }}>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div className='spot_detail_desc_callout_container'>
                <p className='spot_detail_desc'> {spot.description}</p>
                <div className='spot_detail_callout_container'>
                    <div className='spot_detail_callout_price_review_container'>
                        <p id='price' style={{ fontSize: '11pt' }}><span style={{ fontWeight: "bold", fontSize: "15pt" }}>${spot.price}</span> night</p>
                        {spot.avgStarRating === "New" ? (
                            <p>
                                <i className='fa-solid fa-star fa-fw'></i>
                                New
                            </p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: 'row', gap: '3px' }}>
                                <p>
                                    <i className='fa-solid fa-star fa-fw middle_dot'></i>
                                    {spot.avgStarRating}</p>
                                <p>·</p>
                                <p>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</p>
                            </div>
                        )}

                    </div>
                    <button onClick={() => window.alert('Feature coming soon..')} className='reserve_btn' type='button'> Reserve</button>
                </div>
            </div >

            <div className="reviews_parent_container">
                <ReviewIndex spot={spot} />
            </div>
        </div >
    );
}

export default SpotDetail;
