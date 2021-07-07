import { FETCH_PLAYLISTS, FETCH_PLAYLIST_DETAIL, ADD_FAVOURITES } from './actionTypes'

export function fetchPlaylists(input) {
    return {
        type: FETCH_PLAYLISTS,
        payload: input
    }
}

export function fetchPlaylistDetail(input) {
    return {
        type: FETCH_PLAYLIST_DETAIL,
        payload: input
    }
}

export function addFavourites(input) {
    return {
        type: ADD_FAVOURITES,
        payload: input
    }
}