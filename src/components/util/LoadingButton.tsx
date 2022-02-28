import React, { useState, FunctionComponent, CSSProperties } from 'react';
import { Spinner, Button } from 'react-bootstrap';

interface LoadingProps {
    onClick: any;
    className?: string;
    style?: CSSProperties;
    children?: | React.ReactChild | React.ReactChild[];
    disabled?: boolean;
}

const LoadingButton: FunctionComponent<LoadingProps> = ({ onClick, className, style, children, disabled }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        if (isLoading) {
            // no-op the button is disabled
            return;
        }
        setIsLoading(true);

        // swallow any errors to prevent infinite spinning
        try {
            await onClick();
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    };

    return (
        <Button onClick={handleOnClick} className={className} style={style} disabled={disabled || isLoading}>
            {children}
            {isLoading ? <Spinner style={{ marginLeft: '5px' }} animation="border" size="sm" /> : undefined}
        </Button>
    );
};

LoadingButton.defaultProps = {
    className: undefined,
    style: undefined,
    children: undefined,
    disabled: false
};

export default LoadingButton;
