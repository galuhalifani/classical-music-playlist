import { createStore, combineReducers } from 'redux'
import playlistReducer from './reducers/playlists'
import favouriteReducer from './reducers/favourites'

const reducers =  combineReducers({
    playlists: playlistReducer,
    favourites: favouriteReducer
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
