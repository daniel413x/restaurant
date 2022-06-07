import React, { useContext, useState } from 'react';
import {
  Button,
  Form,
} from 'react-bootstrap';
import Context from '../context/context';
import UploadImage from './UploadImage';
import {
  green,
  shortNotification,
} from '../utils/consts';

function EditAvatar() {
  const { notifications, user } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const submit = () => {
    user.setAvatar('avatar');
    notifications.message(
      'Profile picture saved successfully',
      green,
      shortNotification,
    );
  };
  return (
    <Form id="edit-avatar" onSubmit={submit}>
      <UploadImage
        onChangeSetOutsideFormValue={setSelectedFile}
        dimensions={[85, 85]}
      />
      <Button className={`save-button ${!selectedFile && 'disabled-2'}`} type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditAvatar;
