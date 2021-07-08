import React, { useMemo } from 'react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import '../App.css';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setHomeSearchBar } from '../store/actions/actionPlaylist'
import debounce from 'lodash.debounce';

export default function Navigation(props) {
    const dispatch = useDispatch()
    const select = useSelector
    const appTitle = select(state => state.playlists.appTitle)

    function searchBarChange(event) {
        dispatch(setHomeSearchBar(event.target.value))
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(searchBarChange, 300)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

    return (
        <Navbar id='navbar' className='navbar-expand-lg navbar-dark'>
            <Navbar.Brand className="navbar-brand" href="/">{appTitle}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{marginLeft: '3%'}}>
                    <NavLink className='nav-link' exact to="/" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>Home</NavLink>
                    <NavLink className='nav-link' to="/myPlaylist" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>My Favourite Playlists</NavLink>
                    <NavLink className='nav-link' to="/searchArtist" style={{marginRight: '20px'}} activeStyle={{fontWeight: "bold", color: "gold"}}>Search Album By Composer</NavLink>
                </Nav>
                {
                    props.activePage === 'home' ?
                    <span className='d-flex' style={{fontSize: '1rem', color: 'grey'}}>
                        <i style={{margin: 'auto', fontSize: '130%'}} className='fas fa-search text-gray-600' data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Back to Homepage"></i>
                    <Form inline style={{marginRight: '50px', marginLeft: '10px'}}>
                    <FormControl type="text" placeholder="Search Playlist By Title" name='search' className="mr-sm-2" onChange={debouncedChangeHandler}/>
                    </Form>
                    </span>
                    :
                    null
                }
                </Navbar.Collapse>
        </Navbar>
    )
}