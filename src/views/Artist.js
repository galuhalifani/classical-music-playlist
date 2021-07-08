import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtists } from '../store/actions/actionPlaylist'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";

export default function Artist(props) {
    const dispatch = useDispatch()
    const select = useSelector
    const artists = select(state => state.playlists.artists)
    const [searchBarArtist, setArtist] = useState('Wolfgang Amadeus Mozart')
    const error = select(state => state.playlists.error)
    const loading = select(state => state.playlists.loading)

    function searchArtist(e) {
        setArtist(e.target.value)
    }

    function submitArtist(e) {
        e.preventDefault()
        dispatch(fetchArtists(searchBarArtist))
    }

    useEffect(() => {
        props.changeActivePage('artist')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='main_content'>
            <div style={{margin:'auto', paddingTop: '4%', textAlign: 'center'}}>
                <h1 style={{margin: 'auto', color:'lightyellow'}}>Search Album by Artists</h1><br />
                <Form onSubmit={(e) => {submitArtist(e)}} style={{marginRight: '50px', marginLeft: '10px'}}>
                    <label>
                        Select Composer:<br />
                        <select value={searchBarArtist} onChange={searchArtist}>
                            <option value="Wolfgang Amadeus Mozart">Wolfgang Amadeus Mozart</option>
                            <option value="Ludwig Van Beethoven">Ludwig Van Beethoven</option>
                            <option value="Tchaikosvsky">Tchaikosvsky</option>
                            <option value="Chopin">Chopin</option>
                        </select>
                    </label><br />
                    <button type='submit' className="btn btn-success" style={{marginTop: '2%', width:'150px'}}>Search</button>
                </Form>
            </div>
        {
            artists.length === 0 
            ? 
            null
            : 
            loading 
            ? <Loader/> 
            : error 
            ? <Error/> 
            :
            <div style={{marginTop:'50px'}}>
            <div className='playlistCardFav' style={{paddingLeft:'5%', paddingTop: '1%', paddingRight: '5%', paddingBottom: '10px'}}>
            { artists.map(artist => 
                <Card className='m-2' key={artist.id} style={{width: '18rem', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px', marginBottom:'10px'}}>
                    <img className='class="card-img-top' src={artist.images[0].url} alt="Artist Poster"/>
                    <Card.Body>
                        <Card.Title>{artist.name}</Card.Title>

                        <Card.Text className='mb-0 mt-0'>Total Tracks: {artist.total_tracks}</Card.Text><br />

                        <iframe title="`{artist.id}`" src={`https://open.spotify.com/embed/album/${artist.id}`} width= '100%' height='80px' frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </Card.Body>
                </Card> 
            )}
            </div>
            </div>
          }
        </div> 
    )
}