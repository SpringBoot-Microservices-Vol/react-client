import React, {useState} from "react";
import {Nav, Navbar, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {authService} from "../utils/API";
import NavLink from "react-router-dom/NavLink";
import "./NavigationBar.css"

export default function NavigationBar() {
    const [redirect, toggleRedirect] = useState(false);

    const handleLogout = () => {
        authService.logout();
        toggleRedirect(true);
    };

    return (
        <React.Fragment>
            <Navbar expand="lg" className="nav nav-tabs" id="nav-tab" role="tablist">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/home" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Home</h5></NavLink>
                        <NavLink to="/categories" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Categorii</h5></NavLink>
                        <NavLink to="/candidates" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Candidati</h5></NavLink>
                        <NavLink to="/candidates_options" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Candidati Optiuni</h5></NavLink>
                        <NavLink to="/supervisors" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Supraveghetori</h5></NavLink>
                        <NavLink to="/halls" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Sali</h5></NavLink>
                        <NavLink to="/grades" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Note</h5></NavLink>
                        <NavLink to="/reports" className={'main-bar'} activeClassName={'main-nav-active'}>
                            <h5>Rapoarte</h5></NavLink>
                    </Nav>
                    <Button variant="light" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>
            {redirect && <Redirect to='/login'/>}
        </React.Fragment>
    );
}
