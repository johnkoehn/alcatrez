import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Spinner, Button } from 'react-bootstrap';
import fetch from 'node-fetch';
import { PublicKey } from '@solana/web3.js';
import getAccessToken from '../../util/api/getAccessToken';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    const wallet = useWallet();
    const walletModel = useWalletModal();

    const connectWallet = async () => {
        // is wallet selected?
        setIsLoading(true);
        if (!wallet.wallet?.readyState) {
            // have the user select the wallet
            setIsSelecting(true);
            walletModel.setVisible(true);
            return;
        }

        console.log(wallet.wallet?.readyState);
        try {
            await wallet.connect();
        } catch (err) {
            console.log('Wallet connection failed: ', err);
            setIsLoading(false);
        }

        // next the user needs to get a token
    };

    const getAndSignToken = async () => {
        const publicKey = wallet.publicKey as PublicKey;
        const tokenResponse: TokenResponse = await getAccessToken(publicKey);

        console.log(tokenResponse);
    };

    useEffect(() => {
        if (wallet.connected && isLoading) {
            getAndSignToken();
        }
    }, [wallet.connected, isLoading]);

    useEffect(() => {
        if (isSelecting) {
            // check is the wallet has been selected
            if (!walletModel.visible && !wallet.wallet?.readyState) {
                // user did not select a wallet
                setIsSelecting(false);
                setIsLoading(false);
            }

            if (!walletModel.visible) {
                setIsSelecting(false);
                if (!wallet.wallet?.readyState) {
                    setIsLoading(false);
                } else {
                    // finish connecting wallet
                    connectWallet();
                }
            }
        }
    }, [isSelecting, walletModel.visible]);

    // we need to do checks
    // does user have token?
    // is token expired?
    // if token is expired -- let the user login
    // if token not expired -- Logout
    // this type of work should be managed in the authentication provider that we create

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            <Button onClick={connectWallet} disabled={isLoading}>
                Login
                {isLoading ? <Spinner style={{ marginLeft: '5px' }} animation="border" size="sm" /> : undefined}
            </Button>
        </>
    );
};

export default Login;
