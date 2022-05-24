import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-bootstrap';
import {
  faShoppingBasket, faFireBurner, faPersonBiking, faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

interface OrderProgressProps {
  currentOrb: number;
}

function OrderProgress({
  currentOrb,
}: OrderProgressProps) {
  return (
    <Row id="order-progress">
      <div className={`orb-wrapper ${currentOrb === 0 && 'in-progress'} ${currentOrb > 0 && 'finished'}`}>
        <div className="over-connector" />
        <div className="under-connector" />
        <div className="outer-orb">
          <FontAwesomeIcon className="icon" icon={faShoppingBasket} />
          <div className="inner-orb" />
        </div>
      </div>
      <div className={`orb-wrapper ${currentOrb === 1 && 'in-progress'} ${currentOrb > 1 && 'finished'}`}>
        <div className="over-connector" />
        <div className="under-connector" />
        <div className="outer-orb">
          <FontAwesomeIcon className="icon" icon={faFireBurner} />
          <div className="inner-orb" />
        </div>
      </div>
      <div className={`orb-wrapper ${currentOrb === 2 && 'in-progress'} ${currentOrb > 2 && 'finished'}`}>
        <div className="over-connector" />
        <div className="under-connector" />
        <div className="outer-orb">
          <FontAwesomeIcon className="icon" icon={faPersonBiking} />
          <div className="inner-orb" />
        </div>
      </div>
      <div className={`orb-wrapper ${currentOrb === 3 && 'finished'}`}>
        <div className="outer-orb">
          <FontAwesomeIcon className="icon" icon={faSquareCheck} />
          <div className="inner-orb" />
        </div>
      </div>
    </Row>
  );
}

export default OrderProgress;
