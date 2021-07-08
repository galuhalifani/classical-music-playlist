import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import '../App.css';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Navigation(props) {
    const select = useSelector
    const appTitle = select(state => state.playlists.appTitle)
    const [searchBar, setSearchBar] = useState('')

    function searchBarChange(event) {
        setSearchBar(event.target.value)
    }

    return (
        <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
            <Navbar.Brand className="navbar-brand" href="/">{appTitle}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{marginLeft: '3%'}}>
                    <NavLink className='nav-link' exact to="/" activeStyle={{fontWeight: "bold", color: "gold"}}>Home</NavLink>
                    <NavLink className='nav-link' to="/myPlaylist" activeStyle={{fontWeight: "bold", color: "gold"}}>My Favourites</NavLink>
                </Nav>
                {
                    props.activePage === 'home' ?
                    <Form inline onSubmit={(e) => {props.searchPlaylist(e, searchBar)}}>
                    <FormControl type="text" placeholder="Search Playlist Title" name='search' className="mr-sm-2" onChange={searchBarChange}/>
                    <Button type='submit' variant="outline-success">Search</Button>
                    </Form>
                    :
                    null
                }
                </Navbar.Collapse>
        </Navbar>
    )
}