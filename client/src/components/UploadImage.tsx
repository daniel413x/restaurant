import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Form,
} from 'react-bootstrap';

interface UploadImageProps {
  onSubmit?: () => void;
  dimensions: number[];
  existingImage?: string;
  onChangeSetStrOutside?: (...args: any[]) => void;
}

function UploadImage({
  onSubmit,
  dimensions,
  existingImage,
  onChangeSetStrOutside,
}: UploadImageProps) {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [preview, setPreview] = useState<string>('');
  const [width, height] = dimensions;
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit!();
  };
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    if (onChangeSetStrOutside) {
      onChangeSetStrOutside(e.target.files[0]);
    }
  };
  useEffect(() => setPreview(existingImage || ''), [existingImage]);
  useEffect(() => {
    if (selectedFile && existingImage) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (!selectedFile && existingImage) {
      return setPreview(existingImage);
    }
    if (!selectedFile) {
      return setPreview('');
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  return (
    <Form
      className="upload-image"
      onSubmit={submit}
    >
      <div className="image-container">
        {selectedFile || existingImage ? (
          <img
            src={preview}
            alt="avatar-preview"
            className="preview"
          />
        )
          : (
            <div className="placeholder-with-dimensions">
              {`${width}x${height}`}
            </div>
          )}
      </div>
      <input
        onChange={selectFile}
        type="file"
        title=""
      />
      {onSubmit && (
      <Button className={`save-button ${!selectedFile && 'disabled-2'}`} type="submit">
        Save
      </Button>
      )}
    </Form>
  );
}

UploadImage.defaultProps = {
  onSubmit: false,
  existingImage: '',
  onChangeSetStrOutside: false,
};

export default observer(UploadImage);
