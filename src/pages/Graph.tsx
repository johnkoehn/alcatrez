import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import createGraph, { GraphObject } from '../util/dataTypes/graph';

const Graph = () => {
    const [graph] = useState<GraphObject>(createGraph());

    useEffect(() => {
        // graph
        // graph.addNode(1);
        // graph.addNode(2);
        // graph.addNode(3);
        // graph.addNode(4);
        // graph.addEdge(1, 3);
        // graph.addEdge(1, 4);
        // graph.addEdge(2, 1);
        // graph.addEdge(2, 4);
        // graph.addEdge(3, 4);
        // graph.addEdge(4, 1);
        // graph.addEdge(4, 2);
        // graph.addEdge(4, 3);

        // console.log(JSON.stringify(graph.hash, null, 4));
        // graph.removeEdge(4, 3);
        // graph.removeNode(2);
        // console.log(JSON.stringify(graph.hash, null, 4));
    }, [graph]);

    return (
        <Container>
            <Row>
                <Col>
                    <span>Graph Testing</span>
                </Col>
            </Row>
        </Container>
    );
};

export default Graph;
