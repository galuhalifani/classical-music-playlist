import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import playlistReducer from './reducers/playlists'
import favouriteReducer from './reducers/favourites'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    playlists: playlistReducer,
    favourites: favouriteReducer
})

// function logger({ getState }) {
//     return function(next) {
//         return function(action) {
//             // proses
//         }
//     }
// }

function thunkMiddleware({ dispatch, getState }) {
    return function(next) {
        return function(action) {

            if (typeof action === 'function') {
                return action(dispatch, getState)
            }

            return next(action)
        }
    }
}

const store = createStore(
    reducers,
    composeEnhancers(
    applyMiddleware(thunkMiddleware))
)

export default store
