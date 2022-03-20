import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorProps {
    message: null | undefined | string
}

const Error = ({ message }: ErrorProps) => {
    if (!message) {
        return null;
    }

    return (
        <Alert variant="danger">
            {message}
        </Alert>
    );
};

export default Error;
