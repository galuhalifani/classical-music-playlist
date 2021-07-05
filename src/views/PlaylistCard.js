import React from 'react'

class PlaylistCard extends React.Component {
    seePlaylist(e, id) {
        e.preventDefault()
        console.log(id)
    }

    render () {
        return (
            <div className='row' style={{paddingLeft:'5%', paddingRight: '5px', paddingBottom: '10px'}}>
            {
            this.props.playlists.map(playlist => 
            <div key={playlist.id} className='card m-3' style={{width: '18rem', backgroundColor: 'unset', marginRight:'5px', marginBottom:'10px'}}>
                <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
                <div className='card-body'>
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{playlist.name}</h5>
                    </div>
                    <p className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></p><br />
                    <div className="card-text overflow-ellipsis">{playlist.description}</div><br />
                    <a href="/" onClick={(e) => this.seePlaylist(e, playlist.id)} className="btn btn-primary">See Playlist</a>
                </div>
            </div>
            )}
            </div>
        )
    }
}

export default PlaylistCard