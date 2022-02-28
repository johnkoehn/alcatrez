import React, { createContext, FunctionComponent, useContext, useState, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';

interface AuthenticationProviderValues {
    accessToken?: string,
    signedToken?: string,
    decodedToken?: DecodedToken,
    setLogin: Function,
    isAuthenticated: Function,
    isLoggedIn: boolean
}

interface LoginTokens {
    accessToken: string,
    signedToken: string
}

const AuthenticationContext = createContext<AuthenticationProviderValues | undefined>(undefined);

interface AuthenticationProviderProps {
    children: React.ReactChild | React.ReactChild[]
}

// TODO: Change this to having a call getTokens
// calls checks for being authed if tokens exist
// if token expired, force login
// if login fails, delete tokens, creating a logout

const AuthenticationProvider: FunctionComponent<AuthenticationProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<undefined | string>(undefined);
    const [signedToken, setSignedToken] = useState<undefined | string>(undefined);
    const [decodedToken, setDecodedToken] = useState<undefined | DecodedToken>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setLogin = (loginTokens: LoginTokens) => {
        setAccessToken(loginTokens.accessToken);
        setSignedToken(loginTokens.signedToken);

        const decodeResult: DecodedToken = jwtDecode(loginTokens.accessToken);
        setDecodedToken(decodeResult);

        setIsLoggedIn(true);
    };

    const isAuthenticated = () => {
        if (!signedToken || !accessToken || !decodedToken) {
            return false;
        }

        // is decoded token expired?
        const now = DateTime.now();

        // give ourselves a minute leeway
        return decodedToken.exp - now.toSeconds() <= 60;
    };

    const value: AuthenticationProviderValues = useMemo(() => {
        return {
            signedToken,
            accessToken,
            decodedToken,
            setLogin,
            isAuthenticated,
            isLoggedIn
        };
    }, [accessToken, signedToken, decodedToken, isLoggedIn]);

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};

const useAuthentication = () => {
    const context = useContext(AuthenticationContext);

    if (context === undefined) {
        throw new Error('Must be a child of the AuthenticationProvider component');
    }

    return context;
};

export {
    AuthenticationProvider,
    useAuthentication
};
