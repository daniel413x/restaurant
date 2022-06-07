import React, {
  useState, useEffect, ChangeEvent,
} from 'react';
import { observer } from 'mobx-react-lite';
import SmartInput from './SmartInput';

interface UploadImageProps {
  dimensions: number[];
  existingImage?: string;
  outsideFormValue?: any;
  onChangeSetOutsideFormValue?: (...args: any[]) => void;
  pressedSubmit?: boolean;
  setPressedSubmit?: (param: boolean) => void;
}

function UploadImage({
  dimensions,
  existingImage,
  onChangeSetOutsideFormValue,
  pressedSubmit,
  setPressedSubmit,
  outsideFormValue,
}: UploadImageProps) {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [preview, setPreview] = useState<string>('');
  const [width, height] = dimensions;
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    if (onChangeSetOutsideFormValue) {
      onChangeSetOutsideFormValue(e.target.files[0]);
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
    <div
      className="upload-image"
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
            <div
              className="placeholder-with-dimensions"
            >
              {`${width}x${height}`}
            </div>
          )}
      </div>
      <SmartInput
        onFileChange={selectFile}
        type="file"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        value={outsideFormValue}
      />
    </div>
  );
}

UploadImage.defaultProps = {
  existingImage: '',
  onChangeSetOutsideFormValue: false,
  pressedSubmit: false,
  setPressedSubmit: false,
  outsideFormValue: false,
};

export default observer(UploadImage);
