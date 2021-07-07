import React, { useEffect, useState } from 'react'
import PlaylistCard from './views/PlaylistCard.js'
import PlaylistDetail from './views/PlaylistDetail.js'
import useApi from "./hooks/useApi"
import Navigation from "./components/Navbar.js"
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function App() {
  console.log('RENDER APP')
  const [renderedPlaylist, setRenderedPlaylist] = useState([])
  const [playlistLength, setPlaylistLength] = useState(0)
  const [prefix, setPrefix] = useState(null)
  const {data, loading, error} = useApi(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical`)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    if (data.playlists && activePage == 'home') {
      setRenderedPlaylist(data.playlists.items)
      setPlaylistLength(data.playlists.items.length)
    }
  }, [data])

  function searchPlaylist(event, searchBar) {
    event.preventDefault()
    let newPlaylist = data.playlists.items.filter(list => list.name.toLowerCase().includes(searchBar.toLowerCase()))
    setRenderedPlaylist(newPlaylist)
    setPlaylistLength(newPlaylist.length)
  }

  function playlistDetails(e, id) {
    e.preventDefault()
    setPrefix(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/playlists?id=${id}`)
    setActivePage('details')
  }
  
  function toHome(e) {
    e.preventDefault()
    setActivePage('home')
  }

    return (
      <BrowserRouter>
          <div>
            <Navigation searchPlaylist={searchPlaylist} activePage={activePage} toHome={toHome}/>

            <Switch>
              <Route path="/details">
              <PlaylistDetail prefix={prefix}/>
              </Route>     

              <Route path="/">
              <PlaylistCard playlists={renderedPlaylist} playlistDetails={playlistDetails} data={data} loading={loading} error={error} playlistLength={playlistLength}/>
              </Route>     
  
          </Switch>
          </div>
      </BrowserRouter>
    ) 
}
