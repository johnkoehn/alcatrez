import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Login from '../components/login/Login';
import { useAuthentication } from '../components/providers/Authentication';

const Navigation = () => {
    const wallet = useWallet();
    const authentication = useAuthentication();

    const buildWalletButton = () => {
        if (!wallet.disconnecting && (wallet.connected || wallet.connecting)) {
            return (
                <WalletDisconnectButton key="wallet-disconnect" />
            );
        }

        return (
            <WalletMultiButton key="wallet-connect" />
        );
    };

    const buildRightNav = () => {
        if (authentication.isLoggedIn) {
            return (
                <Nav>
                    <NavDropdown title="profile">
                        <NavDropdown.Item>Temp</NavDropdown.Item>
                    </NavDropdown>
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
                <Nav>
                    {buildWalletButton()}
                </Nav>
                {buildRightNav()}
            </Container>
        </Navbar>
    );
};

export default Navigation;
