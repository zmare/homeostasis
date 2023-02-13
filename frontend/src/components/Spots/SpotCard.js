const SpotCard = ({ spot }) => {

    return (
        <ul>
            <img src={spot.previewImage}></img>
            <li>{spot.city}, {spot.state}</li>
            <li>{spot.avgRating}</li>
            <li>${spot.price} night</li>

        </ul>

    );
}

export default SpotCard;
