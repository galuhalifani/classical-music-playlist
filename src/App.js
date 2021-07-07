import React, { useEffect, useState } from 'react'
import PlaylistCard from './views/PlaylistCard.js'
import PlaylistDetail from './views/PlaylistDetail.js'
import MyPlaylist from './views/MyPlaylist.js'
import useApi from "./hooks/useApi"
import Navigation from "./components/Navbar.js"
import './App.css';
import { Switch, Route } from "react-router-dom";

export default function App() {
  console.log('RENDER APP')
  const [renderedPlaylist, setRenderedPlaylist] = useState([])
  const [playlistLength, setPlaylistLength] = useState(0)
  const {data, loading, error} = useApi(`https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical`)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    if (data.playlists) {
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

  function changeActivePage(page) {
    setActivePage(page)
  }

    return (
      <div>
        <Navigation searchPlaylist={searchPlaylist} activePage={activePage}/>

        <Switch>
          <Route exact path="/">
          <PlaylistCard playlists={renderedPlaylist} data={data} loading={loading} error={error} playlistLength={playlistLength} changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="/playlist/:id">
          <PlaylistDetail />
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
