import { ADD_FAVOURITES, TOGGLE_LOADING, TOGGLE_ERROR } from '../actionTypes'

export function addFavourites(input) {
    return {
        type: ADD_FAVOURITES,
        payload: input
    }
}

export function toggleLoading(input) {
    return {
        type: TOGGLE_LOADING,
        payload: input
    }
}

export function toggleError(input) {
    return {
        type: TOGGLE_ERROR,
        payload: input
    }
}