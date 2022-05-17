import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Col, Form,
} from 'react-bootstrap';

interface SmartInputProps {
  primaryStyle?: boolean;
  label?: string;
  onChange: (e: string) => void;
  value: string;
  placeholder?: string;
  pressedSubmit: boolean;
  setPressedSubmit: (param: boolean) => void;
  optional?: boolean;
  bsWidth?: number | boolean;
}

function SmartInput({
  label,
  onChange,
  value,
  placeholder,
  pressedSubmit,
  setPressedSubmit,
  optional,
  bsWidth,
  primaryStyle,
}: SmartInputProps) {
  const [warn, setWarn] = useState<boolean>(false);
  useEffect(() => {
    if (pressedSubmit && !optional && value === '') {
      setWarn(true);
    }
  }, [pressedSubmit]);
  useEffect(() => {
    setWarn(false);
    setPressedSubmit(false);
  }, [value]);
  return (
    <Col className="smart-input" md={bsWidth}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      <Form.Control
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className={`${warn && 'warn'} ${primaryStyle && 'primary-style'}`}
      />
    </Col>
  );
}

SmartInput.defaultProps = {
  placeholder: '',
  optional: false,
  bsWidth: false,
  primaryStyle: false,
  label: '',
};

export default SmartInput;
