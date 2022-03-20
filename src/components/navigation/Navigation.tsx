import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Login from '../login/Login';
import { useAuthentication } from '../providers/Authentication';

const Navigation = () => {
    const authentication = useAuthentication();
    const navigate = useNavigate();

    const buildRightNav = () => {
        if (authentication.isAuthenticated()) {
            return (
                <Nav>
                    <Profile />
                </Nav>
            );
        }

        return (
            <Nav className="float-right">
                <Login />
            </Nav>
        );
    };

    const buildLeftNav = () => {
        return (
            <Nav className="me-auto">
                <Nav.Item>
                    <Nav.Link onClick={() => navigate('/post')}>Create Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="Com Sci" id="ComSci">
                        <NavDropdown.Item onClick={() => navigate('/queue')}>Queue</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate('/doubly-linked-list')}>Doubly Linked List</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
        );
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>Alcatrez</Navbar.Brand>
                {buildLeftNav()}
                {buildRightNav()}
            </Container>
        </Navbar>
    );
};

export default Navigation;
