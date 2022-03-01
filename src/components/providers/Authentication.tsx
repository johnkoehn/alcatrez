import React, { createContext, FunctionComponent, useContext, useReducer, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';
import { useWallet } from '@solana/wallet-adapter-react';

interface AuthenticationProviderValues {
    getTokens: Function,
    login: Function,
    isAuthenticated: Function,
    logout: Function
}

interface LoginTokens {
    accessToken: string,
    signedToken: string
}

interface AuthInformation {
    accessToken?: string,
    signedToken?: string,
    decodedToken?: DecodedToken
}

enum AuthAction {
    LOGIN,
    LOGOUT
}

interface Actions {
    type: AuthAction,
    value?: AuthInformation
}

const AuthenticationContext = createContext<AuthenticationProviderValues | undefined>(undefined);

interface AuthenticationProviderProps {
    children: React.ReactChild | React.ReactChild[]
}

const isTokenExpired = (decodedToken: DecodedToken): boolean => {
    // is decoded token expired?
    const now = DateTime.now();

    // give ourselves a minute leeway
    return decodedToken.exp - now.toSeconds() <= 60;
};

const authReducer = (_state: AuthInformation, action: Actions): AuthInformation => {
    switch (action.type) {
        case (AuthAction.LOGIN): {
            localStorage.setItem('accessToken', (action.value?.accessToken as string));
            localStorage.setItem('signedToken', (action.value?.signedToken as string));
            return {
                ...action.value
            };
        }
        case (AuthAction.LOGOUT): {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('signedToken');
            return {};
        }
        default: {
            throw new Error('Unknown auth action type');
        }
    }
};

const authInitialState = (): AuthInformation => {
    const localAccessToken = localStorage.getItem('accessToken');
    const localSignedToken = localStorage.getItem('signedToken');

    if (localAccessToken && localSignedToken) {
        const localDecodedToken: DecodedToken = jwtDecode(localAccessToken);

        if (!isTokenExpired(localDecodedToken)) {
            return {
                accessToken: localAccessToken,
                signedToken: localSignedToken,
                decodedToken: localDecodedToken
            };
        }
    }
    return {};
};

const AuthenticationProvider: FunctionComponent<AuthenticationProviderProps> = ({ children }) => {
    const [authInformation, dispatch] = useReducer(authReducer, {}, authInitialState);
    const wallet = useWallet();

    const getTokens = (): AuthInformation => {
        // TODO: Change this to having a call getTokens
        // calls checks for being authed if tokens exist
        // if token expired, force login
        // if login fails, delete tokens, creating a logout
        return authInformation;
    };

    const login = (loginTokens: LoginTokens) => {
        dispatch({
            type: AuthAction.LOGIN,
            value: {
                ...loginTokens,
                decodedToken: jwtDecode(loginTokens.accessToken)
            }
        });
    };

    const isAuthenticated = (): boolean => {
        const { signedToken, accessToken, decodedToken } = authInformation;

        if (!signedToken || !accessToken || !decodedToken) {
            return false;
        }

        return !isTokenExpired(decodedToken);
    };

    const logout = () => {
        if (wallet.connected) {
            // don't await this for now, let it run in the background
            wallet.disconnect();
        }

        dispatch({
            type: AuthAction.LOGOUT
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('signedToken');
    };

    const value: AuthenticationProviderValues = useMemo(() => {
        return {
            getTokens,
            login,
            isAuthenticated,
            logout
        };
    }, [authInformation, authInformation.accessToken]);

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
