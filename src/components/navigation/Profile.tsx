import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useAuthentication } from '../providers/Authentication';

const cleanPublicKey = (publicKey: string) => {
    return `${publicKey.slice(0, 5)}...`;
};

const Profile = () => {
    const { getTokens, logout } = useAuthentication();

    const tokenInfo = getTokens();
    const publicKey = tokenInfo.decodedToken.sub;
    return (
        <NavDropdown title="profile">
            <NavDropdown.ItemText>{cleanPublicKey(publicKey)}</NavDropdown.ItemText>
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
        </NavDropdown>
    );
};

export default Profile;
