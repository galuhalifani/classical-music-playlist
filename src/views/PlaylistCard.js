import React from 'react'
import Card from 'react-bootstrap/Card'
import '../App.css';

export default function PlaylistCard(props) {
    function seePlaylist(e, id) {
        e.preventDefault()
        console.log(id)
    }

    return (
        <div className='row' style={{paddingLeft:'5%', paddingRight: '5px', paddingBottom: '10px'}}>
            { props.playlists.map(playlist => 
                <Card className='card m-3' key={playlist.id} style={{width: '18rem', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px', marginBottom:'10px'}}>
                    <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
                    <Card.Body>
                        <Card.Title>{playlist.name}</Card.Title>

                        <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
                        <Card.Text className="overflow-ellipsis">{playlist.description}</Card.Text>

                        <Card.Link onClick={(e) => seePlaylist(e, playlist.id)} className="btn btn-primary">See Playlist</Card.Link>
                    </Card.Body>
                </Card> 
            )}
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