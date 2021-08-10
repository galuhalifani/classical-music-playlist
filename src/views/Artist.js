import React, { useEffect, useState } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtists, toggleLoading, setArtists, setArtistName } from '../store/actions/actionPlaylist'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";

export default function Artist(props) {
    const dispatch = useDispatch()
    const select = useSelector
    const artists = select(state => state.playlists.artists)
    const artist_name = select(state => state.playlists.artist_name)
    const [searchBarArtist, setArtist] = useState(artist_name)
    const error = select(state => state.playlists.error)
    const loading = select(state => state.playlists.loading)

    function searchArtist(e) {
        setArtist(e.target.value)
    }

    function submitArtist(e) {
        e.preventDefault()
        if (searchBarArtist !== '') {
            dispatch(setArtistName(searchBarArtist))
            dispatch(fetchArtists(searchBarArtist))
        }
    }

    useEffect(() => {
        props.changeActivePage('artist')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='main_content'>
            <div style={{margin:'auto', paddingTop: '4%', textAlign: 'center'}}>
                <h1 style={{margin: 'auto', color:'lightyellow'}}>Albums by Composer</h1><br />
                <Form onSubmit={(e) => {submitArtist(e)}} style={{marginRight: '10px', marginLeft: '10px'}}>
                    <label>
                        Select Composer:<br />
                        <select value={searchBarArtist} onChange={searchArtist}>
                            <option value="">---SELECT---</option>
                            <option value="Wolfgang Amadeus Mozart">Wolfgang Amadeus Mozart</option>
                            <option value="Ludwig Van Beethoven">Ludwig Van Beethoven</option>
                            <option value="Tchaikosvsky">Pyotr Ilyich Tchaikovsky</option>
                            <option value="Chopin">Frédéric Chopin</option>
                            <option value="Franz Liszt">Franz Liszt</option>
                            <option value="Johannes Brahms">Johannes Brahms</option>
                            <option value="Johann Sebastian Bach">Johann Sebastian Bach</option>
                        </select>
                    </label><br />
                    <button type='submit' className="btn btn-success" style={{marginTop: '2%', width:'150px'}}>Search</button>
                </Form>
            </div>
        {
            loading 
            ? <Loader/> 
            :
            artists.length === 0 
            ? 
            null
            : error 
            ? <Error/> 
            :
            <div style={{marginTop:'10px'}}>
            <Row className='playlistCardFav' xs={1} md={3} lg={4} className="g-4" style={{paddingLeft:'5%', paddingTop: '2%', paddingRight: '5%', paddingBottom: '10px'}}>
            {/* <div className='playlistCardFav' style={{paddingLeft:'5%', paddingTop: '1%', paddingRight: '5%', paddingBottom: '10px'}}> */}
            { artists.map(artist => 
                <Col style={{marginBottom:'2%', marginTop: '1%', textAlign: 'center'}}>
                <Card className='m-2' key={artist.id} style={{width: '18rem', height: '100%', backgroundColor: 'black', border: '2px solid #eae0aa'}}>
                    <img className='class="card-img-top' src={artist.images[0].url} alt="Artist Poster"/>
                    <Card.Body>
                        <Card.Title className='overflow ellipsis'>{artist.name}</Card.Title>

                        <Card.Text className='mb-0 mt-0'>Total Tracks: {artist.total_tracks}</Card.Text><br />

                        <iframe title="`{artist.id}`" src={`https://open.spotify.com/embed/album/${artist.id}`} width= '100%' height='80px' frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </Card.Body>
                </Card> 
                </Col>
            )}
            </Row>
            {/* </div> */}
            </div>
          }
        </div> 
    )
}