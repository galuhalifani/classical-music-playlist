import { SET_PLAYLISTS, SET_PLAYLIST_DETAIL, TOGGLE_LOADING, TOGGLE_ERROR } from '../actionTypes'

const initialState = {
    appTitle: 'Your Classical Music Playlist',
    playlists: [],
    playlistDetail: {},
    error: false,
    loading: false
}

function playlistReducer(state = initialState, action) {
    if (action.type === SET_PLAYLISTS ) {
        return { ...state, playlists: action.payload }
    } else if (action.type === SET_PLAYLIST_DETAIL ) {
        return { ...state, playlistDetail: action.payload }
    } else if (action.type === TOGGLE_LOADING ) {
        return { ...state, loading: action.payload }
    } else if (action.type === TOGGLE_ERROR ) {
        return { ...state, error: action.payload }
    }

    return state
}

export default playlistReducer