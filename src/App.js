import React from 'react'
import './App.css';
import PlaylistCard from './views/PlaylistCard.js'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      appTitle: "Your Classical Music Playlist",
      playlists: []
    }
  }

  componentDidMount() {
    fetch("https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical")
    .then(response => response.json())
    .then(data => {
      this.setState({playlists: data.playlists.items})
      console.log(data.playlists.items)
    })
    .catch(err => console.log(err))
  }

  render () {
    var main_content = {
      width: '100%',
      marginBottom: '40px',
      justifyContent: 'center'
  };

    return (
      <div>
      <h1>{this.state.appTitle}</h1>
      <div style={main_content}>
        <PlaylistCard playlists={this.state.playlists}/>
      </div>
      </div>
    )
  }  
}

export default App;
