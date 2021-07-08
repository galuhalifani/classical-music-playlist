import { ADD_FAVOURITES } from './actionTypes'

const initialState = {
    favourites: [],
    error: false,
    loading: false
}

function favouriteReducer(state = initialState, action) {
    if (action.type === ADD_FAVOURITES ) {
        return { ...state, favourites: [...state.favourites, action.payload] }
    }
    return state
}

export default favouriteReducer