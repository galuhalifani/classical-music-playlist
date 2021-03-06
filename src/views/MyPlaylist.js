import React, { useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import '../App.css';
import Lottie from "lottie-react";
import animation from "../assets/animations/24815-crying-heart.json"

export default function MyPlaylist(props) {
    const history = useHistory()
    const select = useSelector
    const activePage = props.changeActivePage
    const favourites = select(state => state.favourites.favourites)

    useEffect(() => {
        activePage('favourites')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function seePlaylist(e, id) {
        e.preventDefault()
        props.changeActivePage('details')
        history.push(`/playlist/${id}`)
    }

    function toHome(e) {
        e.preventDefault()
        props.changeActivePage('home')
        history.push(`/`)
    }

    function playListDesc(description) {
        return {__html: description}
    }

    return (
        <div className='main_content'>
        {
            favourites.length === 0 
            ? 
            <div style={{margin:'auto', paddingTop: '4%', textAlign: 'center'}}>
                <h1 style={{margin: 'auto', color:'red'}}>Oops, No Favourites.</h1><br />
                <h2 style={{margin: 'auto', color:'#cdcda3'}}>Add a Favourite First</h2>
                <div style={{height: '200px'}}>
                    <Lottie animationData={animation} background="transparent" speed="2"  style={{margin:"auto", marginTop: '2%', height:"100%"}} loop autoplay></Lottie>
                </div>
                <button className="btn btn-dark" onClick={(e) => toHome(e)} style={{marginTop: '2%', width:'300px'}}>Back To Home</button>
            </div>
            : 
            <div>
            {/* <h1 style={{fontSize:'4vw', paddingLeft:'6%', paddingTop: '2%', paddingRight: '5%'}}>My Favourite Playlists</h1> */}
            <Row className='playlistCardFav' xs={1} md={3} lg={4} className="g-4" style={{paddingLeft:'5%', paddingTop: '3%', paddingRight: '5%', paddingBottom: '10px'}}>
            {/* <div className='playlistCardFav' style={{paddingLeft:'5%', paddingTop: '1%', paddingRight: '5%', paddingBottom: '10px'}}> */}
            { favourites.map(playlist => 
                <Col style={{marginBottom:'2%', marginTop: '1%'}}>
                <Card key={playlist.id} style={{height: '100%', backgroundColor: 'black', border: '2px solid #eae0aa', marginRight:'5px'}}>
                    <img className='cardImgFav' src={playlist.images[0].url} alt="Playlist Poster"/>
                    <Card.Body>
                        <Card.Title>{playlist.name}</Card.Title>

                        <Card.Text className='mb-0 mt-0'><b>Total Tracks: {playlist.tracks.total}</b></Card.Text><br />
                        <div className='description overflow-ellipsis' dangerouslySetInnerHTML={playListDesc(playlist.description)}/><br />

                        <Card.Link className="btn btn-primary" onClick={(e) => seePlaylist(e, playlist.id)}>See Playlist</Card.Link>
                    </Card.Body>
                </Card> 
                </Col>
            )}
            {/* </div> */}
            </Row>
            </div>
          }
        </div>
    )
}