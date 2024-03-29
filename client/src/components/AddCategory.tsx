import React, {
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  FormEvent,
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
  red,
  shortNotification,
} from '../utils/consts';
import { createCategory } from '../http/categoryAPI';

function AddCategory() {
  const { categories, notifications } = useContext(Context);
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [name, setName] = useState<string>('Add new category');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!active) {
      return null;
    }
    try {
      const newCategory = await createCategory(name);
      categories.add(newCategory);
      setActive(false);
      setName('Add new category');
      return notifications.message(
        'Category created',
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
    <div className={`category collapsible-item ${active && 'active-or-expanded'}`} ref={outsideClickRef}>
      <Form className="title-buttons-row body" onSubmit={submit}>
        <Col className="tab-col" md="auto">
          <Form.Control
            id="add-category-field"
            ref={focusRef}
            value={active ? name : name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className={`${!active && 'blocked'}`}
          />
        </Col>
        <Col className="icon-buttons" md="auto">
          {active && (
            <Button
              title="Save"
              type="submit"
              id="submit-add-category-button"
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
          <Button
            onClick={() => setActive(!active)}
            title={active ? 'Cancel' : 'Edit'}
            id="toggle-add-category-button"
          >
            <FontAwesomeIcon icon={active ? faBan : faPlus} />
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default observer(AddCategory);
