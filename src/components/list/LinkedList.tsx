import React from 'react';
import { Line } from 'react-konva';
import ListNode from './ListNode';
import { Dequeue, QNode } from '../../util/dataTypes/dequeue';

interface LinkedListProps {
    startX: number,
    startY: number,
    radius: number,
    linkedList: Dequeue,
    nodeSpacing: number
}

const LinkedList = ({ startX, startY, nodeSpacing, radius, linkedList }: LinkedListProps) => {
    const buildLinkedList = () => {
        let node: QNode | null = linkedList.head().node;
        const elements = [];

        let i = 0;
        while (node) {
            const x = startX + (nodeSpacing * i);
            const y = startY;
            elements.push(
                <ListNode
                    x={x}
                    y={y}
                    radius={radius}
                    value={node.value}
                    key={`${x}${y}`}
                />
            );

            node = node.next;

            // add a line to the next node
            if (node) {
                // create a line from one end to the next
                const endOfPreviousCircle = x + radius;
                const startOfNextCircle = x + nodeSpacing - radius;
                elements.push(
                    <Line
                        points={[endOfPreviousCircle, startY, startOfNextCircle, startY]}
                        strokeWidth={3}
                        stroke="black"
                        key={`${x}${y}-line`}
                    />
                );
            }

            i += 1;
        }

        return elements;
    };

    return (
        <>
            {buildLinkedList()}
        </>
    );
};

export default LinkedList;
