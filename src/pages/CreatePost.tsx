import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Editor from '../components/editor/Editor';

const CreatePost = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Editor />
                </Col>
            </Row>
        </Container>
    );
};

export default CreatePost;
