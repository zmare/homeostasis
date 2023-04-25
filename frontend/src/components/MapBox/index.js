import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

const MapBox = ({ spot }) => {
    return (
        <Map
            initialViewState={{
                longitude: spot.lng,
                latitude: spot.lat,
                zoom: 14
            }}
            style={{ width: 1000, height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1Ijoiem1hcmUiLCJhIjoiY2xndHRvYXRpMjZmbDN0bHUxZ3lzZWZrYiJ9.NM7sD1vPmMv4I3UffYSq6g'
        >
            <Marker
                latitude={spot.lat}
                longitude={spot.lng}
                offsetLeft={-20}
                offsetTop={-10}>
            </Marker>
        </Map>
    );
}




export default MapBox;
