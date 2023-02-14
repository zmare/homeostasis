import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/load';


const loadReviews = reviews => ({
    type: LOAD_REVIEWS,
    reviews
});


export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }

}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const spot = {};
            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            })
            return {
                ...state,
                spot
            }
        }
        default:
            return state;
    }
}

export default reviewReducer;
