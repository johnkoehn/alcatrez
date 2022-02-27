import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Login from '../components/login/Login';

const Navigation = () => {
    const wallet = useWallet();

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

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>Alcatrez</Navbar.Brand>
                <Nav>
                    <Login />
                </Nav>
                <Nav className="float-right">
                    {buildWalletButton()}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
