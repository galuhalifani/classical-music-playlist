import React, { useEffect, useState } from 'react'
import './App.css';
import PlaylistCard from './views/PlaylistCard.js'
import PlaylistDetail from './views/PlaylistDetail.js'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import NoData from "./components/NoData.js";
import useApi from "./hooks/useApi"

export default function App() {
  console.log('RENDER APP')
  const [appTitle] = useState("Your Classical Music Playlist")
  const [renderedPlaylist, setRenderedPlaylist] = useState([])
  const [playlistLength, setPlaylistLength] = useState(0)
  const [prefix, setPrefix] = useState(null)
  const {data, loading, error} = useApi(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical`)
  const {data: dataDetail, loading: loadingDetail, error: errorDetail} = useApi(prefix)
  const [searchBar, setSearchBar] = useState('')
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    if (data.playlists && activePage == 'home') {
      setRenderedPlaylist(data.playlists.items)
      setPlaylistLength(data.playlists.items.length)
    }
  }, [data])

  function searchPlaylist(event) {
    event.preventDefault()
    let newPlaylist = data.playlists.items.filter(list => list.name.toLowerCase().includes(searchBar.toLowerCase()))
    setRenderedPlaylist(newPlaylist)
    setPlaylistLength(newPlaylist.length)
  }

  function searchBarChange(event) {
    setSearchBar(event.target.value)
  }

  function playlistDetails(e, id) {
    e.preventDefault()
    // console.log(id, 'idddddddd')
    setPrefix(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/playlists?id=${id}`)
    setActivePage('details')
  }
  
  function toHome(e) {
    e.preventDefault()
    setActivePage('home')
  }

  if (activePage == 'home') {
    return (
      <div>
        <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
          <Navbar.Brand className="navbar-brand" href="/">{appTitle}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{marginLeft: '3%'}}>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">My Playlists</Nav.Link>
            </Nav>
          <Form inline onSubmit={searchPlaylist}>
            <FormControl type="text" placeholder="Search Playlist Title" name='search' className="mr-sm-2" onChange={searchBarChange}/>
            <Button type='submit' variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>

        <div className='main_content'>
          {
            loading ? <Loader/> : error ? <Error/> : playlistLength <= 0 ? <NoData/> : <PlaylistCard playlists={renderedPlaylist} playlistDetails={playlistDetails}/>
          }
        </div>

      </div>
    )
  } else if (activePage == 'details') {
    return (
      <div>
        <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
          <Navbar.Brand className="navbar-brand" href="/">{appTitle}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{marginLeft: '3%'}}>
              <Nav.Link href="#home" onClick={toHome}>Home</Nav.Link>
              <Nav.Link href="#link">My Playlists</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>

        <div className='main_content'>
          {
            loadingDetail ? <Loader/> : errorDetail ? <Error/> : <PlaylistDetail playlist={dataDetail}/>
          }
        </div>

      </div>
    )
  } 
}
