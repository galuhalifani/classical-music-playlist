import React, { useEffect, useState } from 'react'
import Home from './views/Home.js'
import PlaylistDetail from './views/PlaylistDetail.js'
import MyPlaylist from './views/MyPlaylist.js'
import Navigation from "./components/Navbar.js"
import './App.css';
import { Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function App() {
  const select = useSelector
  const playlists = select(state => state.playlists)

  console.log('RENDER APP')
  const [renderedPlaylist, setRenderedPlaylist] = useState([])
  const [playlistLength, setPlaylistLength] = useState(1)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    if (playlists) {
      setRenderedPlaylist(playlists)
      setPlaylistLength(playlists.length)
    }
  }, [playlists])

  function searchPlaylist(event, searchBar) {
    event.preventDefault()
    let newPlaylist = playlists.filter(list => list.name.toLowerCase().includes(searchBar.toLowerCase()))
    setRenderedPlaylist(newPlaylist)
    setPlaylistLength(newPlaylist.length)
  }

  function changeActivePage(page) {
    setActivePage(page)
  }

    return (
      <div>
        <Navigation searchPlaylist={searchPlaylist} activePage={activePage}/>

        <Switch>
          <Route exact path="/">
          <Home renderedPlaylists={renderedPlaylist} playlistLength={playlistLength} changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="/playlist/:id">
          <PlaylistDetail changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="/myPlaylist">
          <MyPlaylist />
          </Route>     

          <Route path="*">
            <h1>Page Not Found</h1>
          </Route>

        </Switch>
      </div>
    ) 
}
