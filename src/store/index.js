import { createStore } from 'redux'
import { FETCH_PLAYLISTS, FETCH_PLAYLIST_DETAIL, ADD_FAVOURITES } from './actionTypes'

const initialState = {
    appTitle: 'Your Classical Music Playlist',
    playlists: [],
    playlistDetail: {},
    favourites: [] 
}

function reducer(state = initialState, action) {
    if (action.type === FETCH_PLAYLISTS ) {
        return { ...state, playlists: action.payload }
    } else if (action.type === FETCH_PLAYLIST_DETAIL ) {
        return { ...state, playlistDetail: action.payload }
    } else if (action.type === ADD_FAVOURITES ) {
        return { ...state, favourites: [...state.favourites, action.payload] }
    }
    return state
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
