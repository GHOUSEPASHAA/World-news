import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            fixed="top"
            style={{
                padding: '1.5rem', // Increase padding for the navbar
                height: '80px',    // Increase height of the navbar
                fontSize: '1.25rem' // Increase font size for the navbar content
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">World News</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/business">Business</Nav.Link>
                        <Nav.Link as={Link} to="/entertainment">Entertainment</Nav.Link>
                        <Nav.Link as={Link} to="/general">General</Nav.Link>
                        <Nav.Link as={Link} to="/health">Health</Nav.Link>
                        <Nav.Link as={Link} to="/science">Science</Nav.Link>
                        <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
                        <Nav.Link as={Link} to="/technology">Technology</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
