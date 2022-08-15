import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Button, Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import LabeledCheckboxButton from './LabeledCheckboxButton';
import {
  green, longNotification, red, shortNotification,
} from '../utils/consts';
import SmartInput from './SmartInput';
import { editUser } from '../http/userAPI';
import { validateEmail } from '../utils/functions';

function EditEmail() {
  const { notifications, user } = useContext(Context);
  const [newEmail, setNewEmail] = useState<string>('');
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [unlockChangeEmail, setUnlockChangeEmail] = useState<boolean>(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (!newEmail) {
      return notifications.message(
        'Please enter a new email address',
        red,
        shortNotification,
      );
    }
    try {
      const validEmail = validateEmail(newEmail);
      if (!validEmail) {
        return notifications.message(
          'Invalid email format',
          red,
          longNotification,
        );
      }
      const { email: updatedEmail } = await editUser({ email: newEmail });
      user.setEmail(updatedEmail);
      return notifications.message(
        'Email updated successfully',
        green,
        shortNotification,
      );
    } catch (error: any) {
      return notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  return (
    <Col id="edit-email">
      <Col className="your-email">
        Your email
        <Form.Control
          value={user.email}
          readOnly
        />
      </Col>
      <Col>
        <LabeledCheckboxButton
          id="edit-email-checkbox-button"
          label="Change email"
          boolean={unlockChangeEmail}
          setBoolean={setUnlockChangeEmail}
          light
        />
        <Form className={`${!unlockChangeEmail && 'blocked'}`} onSubmit={submit}>
          <Col>
            New Email
            <SmartInput
              id="edit-email-field"
              onChange={setNewEmail}
              value={newEmail}
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
            />
          </Col>
          <Col>
            <Button
              variant="light"
              id="edit-email-save-button"
              className="save-button"
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Form>
      </Col>
    </Col>
  );
}

export default observer(EditEmail);
