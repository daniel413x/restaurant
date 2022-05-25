import React, { useState } from 'react';
import {
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_ROUTE,
} from '../utils/consts';
import AuthBox from './AuthBox';
import Confirmation from './modals/Confirmation';

function SuggestRegistration() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const onSuccess = () => {
    setShowConfirmation(true);
  };
  return (
    <div id="suggest-registration">
      <Confirmation
        show={showConfirmation}
        onHide={() => navigate(`/${ACCOUNT_ROUTE}`)}
      />
      <Col className="bullet-points">
        <ul>
          <li>
            Lorem ipsum dolor sit amet
          </li>
          <li>
            Sit amet
          </li>
          <li>
            Consectetur adipiscing elit
          </li>
          <li>
            Sed tempus
          </li>
        </ul>
        {/*
        <h2>
          Sed tempus
          <br />
          d urna et pharetra.
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum amet leo.
        </p>
        */}
      </Col>
      <Col>
        <AuthBox
          onSuccess={onSuccess}
          showLogin={false}
        />
      </Col>
    </div>
  );
}

export default SuggestRegistration;
