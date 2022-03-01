interface TokenResponse {
    access_token: string,
    token_type: string,
    expires_in: number
}

interface DecodedToken {
    sub: string,
    exp: number,
    iat: number,
    iss: string
}
