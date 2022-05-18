import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Button, Form,
} from 'react-bootstrap';
import Context from '../context/context';
import LabeledCheckboxButton from './LabeledCheckboxButton';
import {
  green, red, shortNotification,
} from '../utils/consts';
import SmartInput from './SmartInput';

function EditPassword() {
  const { notifications } = useContext(Context);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [unlockChangePassword, setUnlockChangePassword] = useState<boolean>(false);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (!newPassword || !confirmNewPassword) {
      return notifications.message(
        'Please complete all fields',
        red,
        shortNotification,
      );
    }
    return notifications.message(
      'Password updated successfully',
      green,
      shortNotification,
    );
  };
  return (
    <Col id="edit-password">
      <Col>
        <LabeledCheckboxButton
          label="Change password"
          boolean={unlockChangePassword}
          setBoolean={setUnlockChangePassword}
          light
        />
      </Col>
      <Form
        className={`password-form ${!unlockChangePassword && 'disabled-2'}`}
        onSubmit={submit}
      >
        <Col>
          New password
          <SmartInput
            onChange={setNewPassword}
            value={newPassword}
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
          />
        </Col>
        <Col>
          Confirm password
          <SmartInput
            onChange={setConfirmNewPassword}
            value={confirmNewPassword}
            pressedSubmit={pressedSubmit}
            setPressedSubmit={setPressedSubmit}
          />
        </Col>
        <Col>
          <Button className="save-button" type="submit">
            Save
          </Button>
        </Col>
      </Form>
    </Col>
  );
}

export default EditPassword;