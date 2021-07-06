import React, { useEffect, useState } from 'react'
import './App.css';
import PlaylistCard from './views/PlaylistCard.js'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Loader from "./components/Loader.js";

export default function App() {
  const [appTitle] = useState("Your Classical Music Playlist")
  const [playlists, setPlaylists] = useState([])
  const [renderedPlaylist, setRenderedPlaylist] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchBar, setSearchBar] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch("https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical")
    .then(response => response.json())
    .then(data => {
      setPlaylists(data.playlists.items)
      setRenderedPlaylist(data.playlists.items)
      console.log(data.playlists.items)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setLoading(false))
  }, [])

  function searchPlaylist(event) {
    event.preventDefault()
    let newPlaylist = playlists.filter(list => list.name.toLowerCase().includes(searchBar.toLowerCase()))
    // console.log(newPlaylist, 'FILTERED ARRAY')
    setRenderedPlaylist(newPlaylist)
  }

  function searchBarChange(event) {
    setSearchBar(event.target.value)
  }

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
          loading 
          ? <Loader/>
          : <PlaylistCard playlists={renderedPlaylist}/>
        }
      </div>

    </div>
  )
}

// class App extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       appTitle: "Your Classical Music Playlist",
//       playlists: []
//     }
//   }

//   componentDidMount() {
//     fetch("https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical")
//     .then(response => response.json())
//     .then(data => {
//       this.setState({playlists: data.playlists.items})
//       console.log(data.playlists.items)
//     })
//     .catch(err => console.log(err))
//   }

//   render () {
//     return (
//       <div>
//       <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
//         <Navbar.Brand className="navbar-brand" href="/">{this.state.appTitle}</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto" style={{marginLeft: '3%'}}>
//         <Nav.Link href="#home">Home</Nav.Link>
//         <Nav.Link href="#link">My Playlists</Nav.Link>
//         </Nav>
//         <Form inline>
//           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//           <Button variant="outline-success">Search</Button>
//         </Form>
//       </Navbar.Collapse>
//       </Navbar>

//       <div className='main_content'>
//         <PlaylistCard playlists={this.state.playlists}/>
//       </div>
//       </div>
//     )
//   }  
// }

// export default App;
