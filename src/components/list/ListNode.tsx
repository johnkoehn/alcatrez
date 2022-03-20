import React from 'react';
import { Circle, Text } from 'react-konva';

interface ListNodeProps {
    x: number,
    y: number,
    radius: number,
    value: string
}

const FONT_SIZE = 20;

const ListNode = ({ x, y, value, radius }: ListNodeProps) => {
    const calculateTextX = () => {
        if (value.length === 1) {
            return x - 5;
        }

        return x - ((FONT_SIZE / 4) * value.length);
    };

    const calculateTextY = () => {
        return y - (FONT_SIZE / 2);
    };

    return (
        <>
            <Circle
                x={x}
                y={y}
                radius={radius}
                fill="red"
                stroke="black"
                strokeWidth={4}
            />
            <Text
                x={calculateTextX()}
                y={calculateTextY()}
                text={value}
                fontFamily="Calibri"
                fontSize={20}
                align="center"
                fill="#FFF"
            />
        </>
    );
};

export default ListNode;
