import { csrfFetch } from "./csrf";

const LOAD_FAVORITES = 'favorite/spots/load';
const ADD_FAVORITE = 'favorite/new';
const DELETE_FAVORITE = 'favorite/delete';

const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    favorites
});

const createFavorite = (spotId => ({
    type: ADD_FAVORITE,
    spotId: spotId
}))

const removeFavorite = (spotId => ({
    type: DELETE_FAVORITE,
    spotId: spotId
}))

export const getFavoritesCurrent = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }
}

export const addFavorite = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();
        review.User = user;
        dispatch(createReview(spotId, review));
    }
}

export const deleteFavorite = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(removeReview(id));
    }
}


const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITES: {
            const spot = {};
            action.reviews.Reviews.forEach(review => {
                let newDate = new Date(review.createdAt);
                newDate = newDate.getTime();
                review.createdAtMiliseconds = newDate;
            })

            let orderedList = Object.values(action.reviews.Reviews);
            orderedList = orderedList.sort((r1, r2) => (r1.createdAtMiliseconds < r2.createdAtMiliseconds) ? 1 : (r1.createdAtMiliseconds > r2.createdAtMiliseconds) ? -1 : 0);

            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            })

            return {
                ...state,
                spot,
                orderedList
            }
        }
        case LOAD_REVIEWS_CURRENT: {
            const user = {};
            action.reviews.Reviews.forEach(review => {
                user[review.id] = review
            })
            return {
                ...state,
                user
            }

        }
        case ADD_FAVORITE: {
            const newState = { ...state };
            const spot = { ...state.spot };
            const user = { ...state.user };
            const orderedList = [...state.orderedList];
            spot[action.review.id] = action.review;
            user[action.review.id] = action.review;
            orderedList.unshift(action.review);
            return { ...newState, spot, user, orderedList };
        }

        case DELETE_FAVORITE: {
            const newState = { ...state };
            const spot = { ...state.spot };
            const user = { ...state.user };
            const orderedList = [...state.orderedList];
            delete spot[action.reviewId];
            delete user[action.reviewId];
            orderedList.shift();
            return { ...newState, spot, user, orderedList };
        }
        default:
            return state;
    }
}

export default favoritesReducer;
