import React, {
  useState, useEffect, useContext, ChangeEvent,
} from 'react';
import {
  Col, Button,
} from 'react-bootstrap';
import Context from '../context/context';
import {
  green, shortNotification,
} from '../utils/consts';

function ChooseAvatar() {
  const { notifications } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [preview, setPreview] = useState<string>('');
  useEffect(() => {
    if (!selectedFile) {
      return setPreview('');
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const submit = () => {
    notifications.message(
      'Profile picture saved successfully',
      green,
      shortNotification,
    );
  };
  return (
    <Col className="image-upload">
      <div className="image-container">
        {selectedFile ? <img src={preview} alt="avatar-preview" />
          : (
            <div className="image-placeholder">
              85x85
            </div>
          )}
      </div>
      <input
        onChange={selectFile}
        type="file"
      />
      <Button className={`save-button ${!selectedFile && 'disabled-2'}`} onClick={submit}>
        Save
      </Button>
    </Col>
  );
}

export default ChooseAvatar;
