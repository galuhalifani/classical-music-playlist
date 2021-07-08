import { FETCH_PLAYLISTS, FETCH_PLAYLIST_DETAIL } from './actionTypes'

const initialState = {
    appTitle: 'Your Classical Music Playlist',
    playlists: [],
    playlistDetail: {},
    error: false,
    loading: false
}

function playlistReducer(state = initialState, action) {
    if (action.type === FETCH_PLAYLISTS ) {
        return { ...state, playlists: action.payload }
    } else if (action.type === FETCH_PLAYLIST_DETAIL ) {
        return { ...state, playlistDetail: action.payload }
    } 

    return state
}

export default playlistReducer