import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Stage, Layer } from 'react-konva';
import { createDequeue, Dequeue } from '../util/dataTypes/dequeue';
import Error from '../components/util/Error';
import LinkedList from '../components/list/LinkedList';

export const enum ListType {
    Queue = 'queue',
    DoublyLinkedList = 'doubly linked list'
}
interface ListProps {
    listType: ListType
}

const RADIUS = 30;
const NODE_SPACING = 100;
const START_X = 34;
const START_Y = 50;

const List = ({ listType }: ListProps) => {
    const [queue] = useState<Dequeue>(createDequeue());
    const [size] = useState({
        width: 1000,
        height: 1000
    });
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [lastPoppedValue, setLastPoppedValued] = useState<string | null>(null);
    const [lastAddedValue, setLastAddedValue] = useState<string | null>(null);
    const stageRef = useRef(null);

    const addToList = () => {
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
        setValue(event.target.value);
    };

    const onAddToQueueKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addToList();
        }
    };

    const onPop = (left: boolean) => {
        if (queue.length() === 0) {
            setErrorMessage(`Cannot pop! Nothing is in the ${listType}`);
            return;
        }

        setErrorMessage('');
        const poppedValue = left ? queue.popLeft() as string : queue.popRight() as string;
        setLastPoppedValued(poppedValue);
    };

    const buildPopTypes = () => {
        if (listType === ListType.Queue) {
            return (
                <Button variant="outline-secondary" style={{ height: '100%' }} onClick={() => onPop(true)}>Pop</Button>
            );
        }

        return (
            <>
                <Button variant="outline-secondary" style={{ height: '100%' }} onClick={() => onPop(true)}>Pop Left</Button>
                <Button variant="outline-secondary" style={{ height: '100%' }} onClick={() => onPop(false)}>Pop Right</Button>
            </>
        );
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
                    <Button variant="outline-secondary" onClick={addToList}>Add</Button>
                </InputGroup>
                <Col md="auto">
                    {buildPopTypes()}
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
                        <LinkedList
                            startX={START_X}
                            startY={START_Y}
                            radius={RADIUS}
                            linkedList={queue}
                            nodeSpacing={NODE_SPACING}
                        />
                    </Layer>
                </Stage>
            </Row>
        </Container>
    );
};

// export const  ListType };
export default List;
