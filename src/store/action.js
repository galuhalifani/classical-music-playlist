import { SET_PLAYLISTS, SET_PLAYLIST_DETAIL, ADD_FAVOURITES, TOGGLE_LOADING, TOGGLE_ERROR } from './actionTypes'

export function setPlaylists(input) {
    return {
        type: SET_PLAYLISTS,
        payload: input
    }
}

export function setPlaylistDetail(input) {
    return {
        type: SET_PLAYLIST_DETAIL,
        payload: input
    }
}

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

export function fetchPlaylists() {
    return function(dispatch) {
        dispatch(toggleError(false))
        dispatch(toggleLoading(true))
        fetch('https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical')
        .then(response => response.json())
        .then(data => {
            dispatch(setPlaylists(data.playlists.items))
            console.log(`BERHASIL FETCH PLAYLISTS`)
        })
        .catch(err => {
            console.log(err)
            dispatch(toggleError(true))
        })
        .finally(() => dispatch(toggleLoading(false)))
    }
}

export function fetchPlaylistDetail(id) {
    return function(dispatch) {
        dispatch(toggleError(false))
        dispatch(toggleLoading(true))
        console.log('id!!!!!', id)
        fetch(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/playlists?id=${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch(setPlaylistDetail(data))
            console.log(`BERHASIL FETCH PLAYLISTS`)
        })
        .catch(err => {
            console.log(err)
            dispatch(toggleError(true))
        })
        .finally(() => dispatch(toggleLoading(false)))
    }
}