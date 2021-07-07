import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylistDetail } from '../store/action'
import '../App.css';

export default function PlaylistDetail(props) {
    const select = useSelector
    const dispatch = useDispatch()
    const {id} = useParams();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const playlist = select(state => state.playlistDetail)

    useEffect(() => {
        props.changeActivePage('details')
        setLoading(true)
        fetch(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/playlists?id=${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch(fetchPlaylistDetail(data))
            console.log(`BERHASIL FETCH DETAIL`)
        })
        .catch(err => {
            console.log(err)
            setError(true)
        })
        .finally(() => setLoading(false))
    }, [])
    
    function playListDesc(description) {
        return {__html: description}
    }

    return (
        <div className='main_content'>
        {
            loading ? <Loader/> : error ? <Error/> : playlist.id ? 
        
            <div className='playlistDetail m-3' style={{paddingLeft:'5%', paddingTop: '2%', paddingRight: '5%', paddingBottom: '10px'}}>
            <Card style={{backgroundColor: 'black', marginRight:'25px', marginBottom:'10px', width: '30%'}}>
                <img className='class="card-img-top' src={playlist.images[0].url} alt="Playlist Poster"/>
                <Card.Body>
                    <Card.Title>{playlist.name}</Card.Title>
                    <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
                    <Card.Text className='mb-0 mt-0'>Total Followers: {playlist.followers.total}</Card.Text><br />
                    <div className='description' dangerouslySetInnerHTML={playListDesc(playlist.description)}/><br />

                </Card.Body>
            </Card>
            <div className="holds-the-iframe" style={{width:"70%", height: '100vh'}}>
            <iframe title="`{playlist.id}`" src={`https://open.spotify.com/embed/playlist/${playlist.id}`} onLoad="$('.holds-the-iframe').css('background-image', 'none');" width= '100%' height='550px' frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            </div>
            :
            null
        }

        </div>            
    )
}