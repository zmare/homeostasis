const LOAD_SPOTS = 'spots/load';
const GET_SPOT = 'spots/spot'

const loadSpots = list => ({
    type: LOAD_SPOTS,
    list
});

const loadSpot = spot => ({
    type: GET_SPOT,
    spot
})

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots?page=1&size=15');

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpots(list));
    }
};

export const getSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpot(spot));
        return spot;
    }
}


const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const allSpots = {};
            action.list.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            return {
                allSpots
            }
        }
        case GET_SPOT: {
            const singleSpot = {};
            singleSpot[action.spot.id] = action.spot;
            return { ...state, singleSpot: { ...singleSpot } };
        }
        default:
            return state;
    }
}

export default spotReducer;
