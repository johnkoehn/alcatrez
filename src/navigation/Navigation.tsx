import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Profile from './Profile';
import Login from '../components/login/Login';
import { useAuthentication } from '../components/providers/Authentication';

const Navigation = () => {
    const authentication = useAuthentication();

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

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>Alcatrez</Navbar.Brand>
                {buildRightNav()}
            </Container>
        </Navbar>
    );
};

export default Navigation;
