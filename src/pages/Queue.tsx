import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Stage, Layer, Line } from 'react-konva';
import ListNode from '../components/list/ListNode';
import { createDequeue, QNode } from '../util/dataTypes/dequeue';
import Error from '../components/util/Error';

const RADIUS = 30;
const NODE_SPACING = 100;
const START_X = 34;
const START_Y = 50;

const Queue = () => {
    const [queue] = useState(createDequeue());
    const [size] = useState({
        width: 1000,
        height: 1000
    });
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [lastPoppedValue, setLastPoppedValued] = useState<string | null>(null);
    const [lastAddedValue, setLastAddedValue] = useState<string | null>(null);
    const stageRef = useRef(null);

    // add to the queue
    // pop from the queue
    const addToQueue = () => {
        if (value === '') {
            setErrorMessage('Must add a value');
            return;
        }
        setErrorMessage('');

        queue.push(value);
        setLastAddedValue(value);
        setValue('');
    };

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (event.target.value !== '') {
        //     setErrorMessage(null);
        // }

        setValue(event.target.value);
    };

    const buildNodes = () => {
        let node: QNode | null = queue.head().node;
        console.log(node);
        const elements = [];

        let i = 0;
        while (node) {
            const x = START_X + (NODE_SPACING * i);
            const y = START_Y;
            elements.push(
                <ListNode
                    x={x}
                    y={y}
                    radius={RADIUS}
                    value={node.value}
                    key={`${x}${y}`}
                />
            );

            node = node.next;

            // add a line to the next node
            if (node) {
                // create a line from one end to the next
                const endOfPreviousCircle = x + RADIUS;
                const startOfNextCircle = x + NODE_SPACING - RADIUS;
                elements.push(
                    <Line
                        points={[endOfPreviousCircle, START_Y, startOfNextCircle, START_Y]}
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

    const onAddToQueueKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addToQueue();
        }
    };

    const onPop = () => {
        if (queue.length() === 0) {
            setErrorMessage('Cannot pop! Nothing is in the queue');
            return;
        }

        setErrorMessage('');
        const poppedValue = queue.popLeft() as string;
        setLastPoppedValued(poppedValue);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Error message={errorMessage} key={errorMessage} />
                </Col>
            </Row>
            <Row style={{ marginTop: 5 }}>
                <InputGroup className="md-3" as={Col}>
                    <FormControl type="number" placeholder="Add to Queue" value={value} onKeyPress={onAddToQueueKeyPress} onChange={updateValue} />
                    <Button variant="outline-secondary" onClick={addToQueue}>Add</Button>
                </InputGroup>
                <Col md="auto">
                    <Button variant="outline-secondary" style={{ height: '100%' }} onClick={onPop}>Pop</Button>
                </Col>
                <Col md="6">
                    <span>Last popped value: {lastPoppedValue}</span>
                    <br />
                    <span>Last added value: {lastAddedValue}</span>
                </Col>
            </Row>
            <Row>
                <Stage
                    ref={stageRef}
                    width={size.width}
                    height={size.height}
                    draggable
                >
                    <Layer>
                        {buildNodes()}
                    </Layer>
                </Stage>
            </Row>
        </Container>
    );
};

export default Queue;
