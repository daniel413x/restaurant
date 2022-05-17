import React, { useState, FormEvent } from 'react';
import {
  Container, Col, Row, Form,
} from 'react-bootstrap';

function Subscribe() {
  const [input, setInput] = useState<string>('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Container id="subscribe">
      <Col md={8} className="content">
        <h2>
          Hurry up! Subscribe to our newsletter
          and get 25% Off
        </h2>
        <p>
          Limited promotion. No credit card required.
        </p>
        <Form onSubmit={(e) => submit(e)}>
          <Row>
            <Col>
              <Form.Control placeholder="Email address" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            </Col>
            <Col md="auto">
              <Form.Control type="submit" value="Subscribe" />
            </Col>
          </Row>
        </Form>
      </Col>
    </Container>
  );
}

export default Subscribe;
