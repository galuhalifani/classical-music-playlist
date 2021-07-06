import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import '../App.css';

export default function Navigation(props) {
    const [searchBar, setSearchBar] = useState('')

    function searchBarChange(event) {
        setSearchBar(event.target.value)
    }

    return (
        <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
            <Navbar.Brand className="navbar-brand" href="/">{props.appTitle}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{marginLeft: '3%'}}>
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">My Playlists</Nav.Link>
                </Nav>
                <Form inline onSubmit={(e) => {props.searchPlaylist(e, searchBar)}}>
                    <FormControl type="text" placeholder="Search Playlist Title" name='search' className="mr-sm-2" onChange={searchBarChange}/>
                    <Button type='submit' variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
        </Navbar>
    )
}