import React, {
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from 'react';
import {
  Col,
  Row,
  Button,
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faPenToSquare,
  faX,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { IFoodCategory } from '../types/types';
import useOnClickOutside from '../hooks/useOnOutsideClick';
import {
  green,
  red,
  shortNotification,
} from '../utils/consts';
import Confirmation from './modals/Confirmation';

function EditedCategory({
  category,
}: {
  category: IFoodCategory;
}) {
  const { name, id } = category;
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const { categories, notifications } = useContext(Context);
  const submitNewName = () => {
    categories.setNewName(id, newName);
    setActive(false);
    notifications.message(
      'Category updated',
      green,
      shortNotification,
    );
  };
  const submitDelete = () => {
    categories.delete(id);
    notifications.message(
      'Category deleted',
      red,
      shortNotification,
    );
  };
  useEffect(() => {
    if (active) {
      focusRef.current?.focus();
    } else {
      setActive(false);
      setNewName(name);
    }
  }, [active]);
  useOnClickOutside(outsideClickRef, () => setActive(false));
  return (
    <Row className={`category ${active && 'active'}`} ref={outsideClickRef}>
      <Confirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmFunc={submitDelete}
        header={`Delete category "${name}"?`}
        body={`Food items under category "${name}" will need to be assigned a new category before they appear in the menu.`}
      />
      <Form>
        <Col className="name" md="auto">
          <Form.Control
            ref={focusRef}
            value={active ? newName : name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
            className={`${!active && 'disabled-2'}`}
          />
        </Col>
        <Col className="buttons-row icon-buttons" md="auto">
          {active && (
          <Button onClick={() => setActive(false)} title="Cancel">
            <FontAwesomeIcon icon={faBan} />
          </Button>
          )}
          {!active ? (
            <Button onClick={() => setActive(!active)} title="Edit">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          ) : (
            <Button onClick={submitNewName} title="Save">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
          <Button className={`${active && 'disabled-2'}`} onClick={() => setShowDeleteModal(true)} title="Delete">
            <FontAwesomeIcon icon={faX} />
          </Button>
        </Col>
      </Form>
    </Row>
  );
}

export default observer(EditedCategory);
