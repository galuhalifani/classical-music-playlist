import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
import NoData from "../components/NoData.js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylists } from '../store/actions/actionPlaylist'
import { addFavourites } from '../store/actions/actionFavourite'
import { useAlert } from 'react-alert'
import '../App.css';

export default function Home(props) {
    const alert = useAlert()
    const history = useHistory()
    const activePage = props.changeActivePage
    const select = useSelector
    const dispatch = useDispatch()
    const favourites = select(state => state.favourites.favourites)
    const error = select(state => state.playlists.error)
    const loading = select(state => state.playlists.loading)
    const playlists = select(state => state.playlists.playlists)
    const searchBar = select(state => state.playlists.searchBar)

    let filteredPlaylist = playlists

    if (searchBar !== '') {
        filteredPlaylist = playlists.filter(list => list.name.toLowerCase().includes(searchBar.toLowerCase()))
    }

    let favouritesId = []
    for (let i = 0; i < favourites.length; i++) {
        favouritesId.push(favourites[i].id)
    }

    const [subscribed, setSubscribed] = useState(favouritesId)

    useEffect(() => {
        activePage('home')
        dispatch(fetchPlaylists())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function seePlaylist(e, id) {
        e.preventDefault()
        props.changeActivePage('details')
        history.push(`/playlist/${id}`)
    }

    function playListDesc(description) {
        return {__html: description}
    }

    function addFavourite(e, playlist) {
        e.preventDefault()
        if (favouritesId.includes(playlist.id)) {
            alert.error("Error: You've already added this to your favourites")            
        } else {
            dispatch(addFavourites(playlist))
            setSubscribed([...subscribed, playlist.id])
            alert.success(`Success: Added ${playlist.name} to favourites`)    
        }
    }

    return (
        <div className='main_content'>
        {
            loading 
            ? <Loader/> 
            : error 
            ? <Error/> 
            : filteredPlaylist.length <= 0 
            ? <NoData/> 
            : 
            <div className='playlistCard' style={{paddingLeft:'5%', paddingTop: '2%', paddingRight: '5%', paddingBottom: '10px'}}>
            { filteredPlaylist.map(playlist => 
                <Card className='m-3' key={playlist.id} style={{width: '22rem', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px', marginBottom:'10px'}}>
                    <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
                    <Card.Body>

                        <div className="d-flex justify-content-between">
                            <Card.Title>{playlist.name}</Card.Title>
                            <a href="/" onClick={(e) => addFavourite(e, playlist)}>
                                <i className={subscribed.includes(playlist.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                            </a>
                        </div>

                        <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
                        <div className='description overflow-ellipsis' dangerouslySetInnerHTML={playListDesc(playlist.description)}/><br />

                        <Card.Link className="btn btn-primary" onClick={(e) => seePlaylist(e, playlist.id)}>See Playlist</Card.Link>
                    </Card.Body>
                </Card> 
            )}
            </div>
          }
        </div>
    )
}

// class PlaylistCard extends React.Component {
//     seePlaylist(e, id) {
//         e.preventDefault()
//         console.log(id)
//     }

//     render () {
//         return (
//             <div className='row' style={{paddingLeft:'5%', paddingRight: '5px', paddingBottom: '10px'}}>
//                 { this.props.playlists.map(playlist => 
//                     <Card className='card m-3' key={playlist.id} style={{width: '18rem', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px', marginBottom:'10px'}}>
//                         <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
//                         <Card.Body>
//                             <Card.Title>{playlist.name}</Card.Title>

//                             <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
//                             <Card.Text className="overflow-ellipsis">{playlist.description}</Card.Text>

//                             <Card.Link onClick={(e) => this.seePlaylist(e, playlist.id)} className="btn btn-primary">See Playlist</Card.Link>
//                         </Card.Body>
//                     </Card> )}
//             </div>
//         )
//     }
// }

// export default PlaylistCard