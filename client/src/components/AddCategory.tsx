import React, {
  useContext,
  useState,
  ChangeEvent,
} from 'react';
import {
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import Context from '../context/context';
import {
  green,
  shortNotification,
} from '../utils/consts';

function AddCategory() {
  const [input, setInput] = useState<string>('');
  const { /* categories, */ notifications } = useContext(Context);
  const submit = () => {
    // categories.add(SERVER);
    notifications.message(
      'Category created',
      green,
      shortNotification,
    );
  };
  return (
    <Col id="add-category">
      <Form onSubmit={submit}>
        <Form.Control
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        />
        <Button type="submit">
          Add
        </Button>
      </Form>
    </Col>
  );
}

export default AddCategory;
