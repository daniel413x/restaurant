import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWheatAwn, faMortarPestle, faReceipt, faHeart,
} from '@fortawesome/free-solid-svg-icons';

function IconPitch() {
  return (
    <div id="icon-pitch">
      <div>
        <FontAwesomeIcon icon={faWheatAwn} />
        <h6>
          Locally sourced
        </h6>
      </div>
      <div>
        <FontAwesomeIcon icon={faMortarPestle} />
        <h6>
          Handmade
        </h6>
      </div>
      <div>
        <FontAwesomeIcon icon={faReceipt} />
        <h6>
          To order
        </h6>
      </div>
      <div>
        <FontAwesomeIcon icon={faHeart} />
        <h6>
          Eat well
        </h6>
      </div>
    </div>
  );
}

export default IconPitch;
