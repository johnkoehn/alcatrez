import fetch from 'node-fetch';
import { PublicKey } from '@solana/web3.js';

const getAccessToken = async (publicKey: PublicKey): Promise<TokenResponse> => {
    const response = await fetch(`${process.env.REACT_APP_AUTH_BASE_URL}/tokens`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            publicKey
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token, got status code: ${response.status}`);
    }

    const responseBody: TokenResponse = (await response.json()) as TokenResponse;
    return responseBody;
};

export default getAccessToken;
