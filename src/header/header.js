import React from "react";
import {Navbar} from "react-bootstrap";
import logo from "../assets/notas.svg";

export default function Header() {
    return <Navbar className="shadow" collapseOnSelect bg="primary" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt="Logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                ToDo D-App
            </Navbar.Brand>
        </Navbar>
}
