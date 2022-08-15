import React, { useContext, useState, FormEvent } from 'react';
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
import { editUser } from '../http/userAPI';

function EditAvatar() {
  const { notifications, user } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState<File>();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('imgAvatar', selectedFile);
    const { avatar } = await editUser(formData);
    user.setAvatar(avatar);
    notifications.message(
      'Profile picture saved successfully',
      green,
      shortNotification,
    );
  };
  const selectFile = (e: File) => {
    setSelectedFile(e);
  };
  return (
    <Form id="edit-avatar" onSubmit={submit}>
      <UploadImage
        onChangeSetOutsideFormValue={selectFile}
        dimensions={[85, 85]}
        existingImage={user.avatar ? `${process.env.REACT_APP_API_URL}${user.avatar}` : ''}
      />
      <Button className={`save-button ${!selectedFile && 'blocked'}`} id="edit-avatar-save-button" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditAvatar;
