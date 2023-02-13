const LOAD_SPOTS = 'spots/load';

const loadSpots = list => ({
    type: LOAD_SPOTS,
    list
});

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api//spots?page=1&size=15');

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpots(list));
    }
};
const initialState = {}

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
        default:
            return state;
    }
}

export default spotReducer;
