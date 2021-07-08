import React, { useState } from 'react'
import Home from './views/Home.js'
import PlaylistDetail from './views/PlaylistDetail.js'
import MyPlaylist from './views/MyPlaylist.js'
import Navigation from "./components/Navbar.js"
import Artist from "./views/Artist.js"
import { Switch, Route } from "react-router-dom";
import './App.css';

export default function App() {
  console.log('RENDER APP')
  const [activePage, setActivePage] = useState('home')

  function changeActivePage(page) {
    setActivePage(page)
  }

    return (
      <div>
        <Navigation activePage={activePage}/>

        <Switch>
          <Route exact path="/">
          <Home changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="/playlist/:id">
          <PlaylistDetail changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="/myPlaylist">
          <MyPlaylist changeActivePage={changeActivePage}/>
          </Route>

          <Route path="/searchArtist">
          <Artist changeActivePage={changeActivePage}/>
          </Route>     

          <Route path="*">
            <h1>Page Not Found</h1>
          </Route>

        </Switch>
      </div>
    ) 
}
