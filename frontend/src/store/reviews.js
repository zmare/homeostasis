import { useReducer } from "react";
import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/spot/load';
const ADD_REVIEW = 'reviews/new';
const DELETE_REVIEW = 'reviews/delete';
const LOAD_REVIEWS_CURRENT = 'reviews/user/load'

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

const loadReviewsUser = reviews => ({
    type: LOAD_REVIEWS_CURRENT,
    reviews
})

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }

}

export const getReviewsCurrent = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviewsUser(reviews));
    }
}

export const addReview = (spotId, user, review) => async (dispatch) => {
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
        case ADD_REVIEW: {
            const newState = { ...state };
            const spot = { ...state.spot };
            const orderedList = [...state.orderedList];
            spot[action.review.id] = action.review;
            orderedList.unshift(action.review);
            return { ...newState, spot, orderedList };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            const spot = { ...state.spot };
            const orderedList = [...state.orderedList];
            delete spot[action.reviewId];
            delete orderedList[0];
            return { ...newState, spot, orderedList };
        }
        default:
            return state;
    }
}

export default reviewReducer;
