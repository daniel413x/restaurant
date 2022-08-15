import React, {
  useState, useRef, MouseEvent, useEffect,
} from 'react';
import useOnClickOutside from '../hooks/useOnOutsideClick';

interface LabeledCheckboxButtonProps {
  label: string;
  boolean: boolean;
  setBoolean: (boolean: boolean) => void;
  classes?: string;
  light?: boolean;
  id?: string;
}

function LabeledCheckboxButton({
  label,
  boolean,
  setBoolean,
  classes,
  light,
  id,
}: LabeledCheckboxButtonProps) {
  const [active, setActive] = useState<boolean>(false);
  const [boxShadow, setBoxShadow] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  useOnClickOutside(ref, () => setBoxShadow(false));
  useEffect(() => {
    setBoxShadow(boolean);
  }, [boolean]);
  let boxShadowVal = null;
  if (light && boxShadow) {
    boxShadowVal = 'box-shadow-light';
  } else if (boxShadow) {
    boxShadowVal = 'box-shadow';
  }
  return (
    <button
      id={id}
      className={`labeled-checkbox-button ${classes}`}
      ref={ref}
      type="button"
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onMouseDown={() => setActive(true)}
      onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
        if (e.buttons > 0) {
          setActive(true);
        }
      }}
      onClick={() => {
        setBoolean(!boolean);
        setBoxShadow(!boolean);
      }}
    >
      <div>
        <div className={`checkbox-div ${boolean && 'checked'} ${active && 'active'} ${boxShadowVal}`} />
      </div>
      <div className="label">
        {label}
      </div>
    </button>
  );
}

LabeledCheckboxButton.defaultProps = {
  light: false,
  classes: '',
  id: '',
};

export default LabeledCheckboxButton;
