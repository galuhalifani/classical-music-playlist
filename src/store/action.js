import { FETCH_PLAYLISTS, FETCH_PLAYLIST_DETAIL } from './actionTypes'

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