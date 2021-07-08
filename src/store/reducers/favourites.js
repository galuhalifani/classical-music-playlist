import { ADD_FAVOURITES, TOGGLE_LOADING, TOGGLE_ERROR } from '../actionTypes'

const initialState = {
    favourites: [],
    error: false,
    loading: false
}

function favouriteReducer(state = initialState, action) {
    if (action.type === ADD_FAVOURITES ) {
        return { ...state, favourites: [...state.favourites, action.payload] }
    } else if (action.type === TOGGLE_LOADING ) {
        return { ...state, loading: action.payload }
    } else if (action.type === TOGGLE_ERROR ) {
        return { ...state, error: action.payload }
    }

    return state
}

export default favouriteReducer