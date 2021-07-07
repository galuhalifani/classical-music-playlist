import React from 'react'
import Card from 'react-bootstrap/Card'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
import NoData from "../components/NoData.js";
import '../App.css';

export default function PlaylistCard(props) {
    function seePlaylist(e, id) {
        e.preventDefault()
        props.playlistDetails(e, id)
    }

    function playListDesc(description) {
        return {__html: description}
    }

    return (
        <div className='main_content'>
        {
            props.loading 
            ? <Loader/> 
            : props.error 
            ? <Error/> 
            : props.playlistLength <= 0 
            ? <NoData/> 
            : 
            <div className='playlistCard' style={{paddingLeft:'5%', paddingTop: '2%', paddingRight: '5%', paddingBottom: '10px'}}>
            { props.playlists.map(playlist => 
                <Card className='m-3' key={playlist.id} style={{width: '22rem', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px', marginBottom:'10px'}}>
                    <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
                    <Card.Body>
                        <Card.Title>{playlist.name}</Card.Title>

                        <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
                        <div className='description overflow-ellipsis' dangerouslySetInnerHTML={playListDesc(playlist.description)}/><br />

                        <Card.Link onClick={(e) => seePlaylist(e, playlist.id)} className="btn btn-primary">See Playlist</Card.Link>
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