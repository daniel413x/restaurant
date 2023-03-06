import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Col,
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SortAndEditCategories from '../components/SortAndEditCategories';
import Context from '../context/context';
import useKeyPress from '../hooks/useKeyPress';
import { ReactComponent as ArrowButtonsIcon } from '../assets/ArrowButtons.svg';
import { ReactComponent as SpacebarIcon } from '../assets/Spacebar.svg';

function EditMenu() {
  const { categories } = useContext(Context);
  const { sortingMode } = categories;
  const { pathname } = useLocation();
  const isDemo = pathname === '/demo/editmenu';
  const [showTabInstructions, setShowTabInstructions] = useState<boolean>(false);
  const [endShowTabInstructions, setEndShowTabInstructions] = useState<boolean>(false);
  const tabPress = useKeyPress('Tab');
  useEffect(() => {
    if (sortingMode && !showTabInstructions && tabPress) {
      setShowTabInstructions(true);
    }
  }, [tabPress]);
  useEffect(() => {
    if (!sortingMode && showTabInstructions) {
      setEndShowTabInstructions(true);
      setTimeout(() => {
        setEndShowTabInstructions(false);
        setShowTabInstructions(false);
      }, 500);
    }
  }, [sortingMode]);
  const baseJSX = (
    <Container id="edit-menu" className={isDemo ? 'demo' : ''}>
      <Col className="main-col">
        <h2>
          Edit menu
        </h2>
        <SortAndEditCategories />
        <div className={`tab-instructions ${showTabInstructions ? 'show' : ''} ${endShowTabInstructions ? 'end' : ''}`}>
          <div className="line-one">
            <SpacebarIcon />
            Spacebar: Select/Place
          </div>
          <div className="line-two">
            <ArrowButtonsIcon />
            Arrow keys: Move selected
          </div>
        </div>
      </Col>
    </Container>
  );
  const demoJSX = (
    <div id="admin">
      {baseJSX}
    </div>
  );
  return isDemo ? demoJSX : baseJSX;
}

export default observer(EditMenu);
