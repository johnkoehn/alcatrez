import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Spinner, Button } from 'react-bootstrap';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import getAccessToken from '../../util/api/getAccessToken';
import { useAuthentication } from '../providers/Authentication';

const encoder = new TextEncoder();

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    const authentication = useAuthentication();
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
    };

    const getAndSignToken = async () => {
        const publicKey = wallet.publicKey as PublicKey;
        const tokenResponse: TokenResponse = await getAccessToken(publicKey);

        const accessToken = tokenResponse.access_token;
        const accessTokenAsUint8Array: Uint8Array = encoder.encode(accessToken);

        const signedMessage: Uint8Array = await (wallet as any).signMessage(accessTokenAsUint8Array);
        const signedToken = bs58.encode(signedMessage);

        authentication.login({
            accessToken,
            signedToken
        });
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

    return (
        <Button onClick={connectWallet} disabled={isLoading}>
            Login
            {isLoading ? <Spinner style={{ marginLeft: '5px' }} animation="border" size="sm" /> : undefined}
        </Button>
    );
};

export default Login;
