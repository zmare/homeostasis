import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/load';
const ADD_REVIEW = 'reviews/new';
const DELETE_REVIEW = 'reviews/delete';


const loadReviews = reviews => ({
    type: LOAD_REVIEWS,
    reviews
});

const createReview = ((spotId, review) => ({
    type: ADD_REVIEW,
    spotId: spotId,
    review
}))

const removeReview = (id) => ({
    type: DELETE_REVIEW,
    reviewId: id
})

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }

}

export const getReviewsCurrent = () => async (dispatch) => {
    return null;
}

export const addReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(spotId, review));
    }
}

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(removeReview(id));
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
        case ADD_REVIEW: {
            const newState = { ...state };
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewReducer;
