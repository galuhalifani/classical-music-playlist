import React from 'react'
import './App.css';
import PlaylistCard from './views/PlaylistCard.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

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
    return (
      <div>
      <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
        <Navbar.Brand className="navbar-brand" href="/">{this.state.appTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{marginLeft: '3%'}}>
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">My Playlists</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
      </Navbar>

      <div className='main_content'>
        <PlaylistCard playlists={this.state.playlists}/>
      </div>
      </div>
    )
  }  
}

export default App;
