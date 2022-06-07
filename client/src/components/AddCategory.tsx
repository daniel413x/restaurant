import React, {
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from 'react';
import {
  Col,
  Button,
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import useOnClickOutside from '../hooks/useOnOutsideClick';
import {
  green,
  shortNotification,
} from '../utils/consts';

function AddCategory() {
  const { categories, notifications } = useContext(Context);
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [name, setName] = useState<string>('Add new category');
  const submitNewName = () => {
    const newCategory = {
      name,
      id: Math.random(),
      foodItems: [],
    };
    categories.add(newCategory);
    setActive(false);
    setName('Add new category');
    notifications.message(
      'Category created',
      green,
      shortNotification,
    );
  };
  const toggleEditTitle = () => {
    setActive(!active);
  };
  useEffect(() => {
    if (active) {
      focusRef.current?.focus();
    } else {
      setActive(false);
      setName(name);
    }
  }, [active]);
  useOnClickOutside(outsideClickRef, () => setActive(false));
  return (
    <div className={`category admin-item ${active && 'active'}`} ref={outsideClickRef}>
      <Form className="title-buttons-row body">
        <Col className="title" md="auto">
          <Form.Control
            ref={focusRef}
            value={active ? name : name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className={`${!active && 'disabled-2'}`}
          />
        </Col>
        <Col className="icon-buttons" md="auto">
          {active && (
          <Button onClick={() => setActive(false)} title="Cancel">
            <FontAwesomeIcon icon={faBan} />
          </Button>
          )}
          {!active ? (
            <Button onClick={toggleEditTitle} title="Edit">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ) : (
            <Button onClick={submitNewName} title="Save">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
        </Col>
      </Form>
    </div>
  );
}

export default observer(AddCategory);
