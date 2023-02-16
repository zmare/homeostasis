import { csrfFetch } from "./csrf";
const LOAD_SPOTS = 'spots/load';
const GET_SPOT = 'spots/spot'
const ADD_SPOT = 'spots/create'
const UPDATE_SPOT = 'spots/spot/update'
const REMOVE_SPOT = 'spots/spot/remove'

const loadSpots = list => ({
    type: LOAD_SPOTS,
    list
});

const loadSpot = spot => ({
    type: GET_SPOT,
    spot
})

const createSpot = spot => ({
    type: ADD_SPOT,
    spot
})

const updateSpot = spot => ({
    type: UPDATE_SPOT,
    spot
})

const removeSpot = id => ({
    type: REMOVE_SPOT,
    spotId: id
})

export const getSpots = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/spots?page=1&size=20');

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpots(list));
    }
};

export const getSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpot(spot));
        return spot;
    }
}

export const addSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createSpot(data));
        return data;
    }
}

export const editSpot = (id, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateSpot(data));
        return data;
    }
}

export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(removeSpot(id));
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
                ...state,
                allSpots
            }
        }
        case GET_SPOT: {
            const singleSpot = {};
            singleSpot[action.spot.id] = action.spot;
            return { ...state, singleSpot: { ...singleSpot } };
        }
        case ADD_SPOT: {
            const newState = { ...state };
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = { ...state };
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        case REMOVE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
