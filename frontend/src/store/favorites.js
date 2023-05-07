import { csrfFetch } from "./csrf";

const LOAD_FAVORITES = 'favorite/spots/load';
const ADD_FAVORITE = 'favorite/new';
const DELETE_FAVORITE = 'favorite/delete';

const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    favorites
});

const createFavorite = (spotId, favorite) => ({
    type: ADD_FAVORITE,
    spotId: spotId,
    favorite
})

const removeFavorite = (spotId => ({
    type: DELETE_FAVORITE,
    spotId: spotId
}))

export const getFavoritesCurrent = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/current`);

    if (response.ok) {
        const favorites = await response.json();
        dispatch(loadFavorites(favorites));
    }
}

export const addFavorite = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${spotId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: ""
    })

    if (response.ok) {
        const favorite = await response.json();
        dispatch(createFavorite(spotId, favorite));
    }
}

export const deleteFavorite = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/${spotId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(removeFavorite(spotId));
    }
}

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITES: {
            const allFavorites = {};
            action.favorites.forEach(favorite => {
                allFavorites[favorite.id] = favorite
            })
            return {
                ...state,
                allFavorites
            }

        }
        case ADD_FAVORITE: {
            // const newState = { ...state };
            // const allFavorites = { ...state.allFavorites };
            // allFavorites[action.favorite.id] = action.favorite;
            // return { ...newState, allFavorites };
            return { ...state };
        }

        case DELETE_FAVORITE: {
            // const newState = { ...state };
            // const allFavorites = { ...state.allFavorites }
            // delete allFavorites[action.favorite.id];
            // return { ...newState, allFavorites };
            return { ...state };
        }
        default:
            return state;
    }
}

export default favoritesReducer;
