import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWheatAwn, faMortarPestle, faReceipt, faHeart,
} from '@fortawesome/free-solid-svg-icons';
import ShownInView from './ShownInView';

interface IconProps {
  IconSvg: any;
  text: string;
  timeout: number;
}

function Icon({
  IconSvg,
  text,
  timeout,
}: IconProps) {
  return (
    <ShownInView
      timeout={timeout}
    >
      <div>
        {IconSvg}
        <h6>
          {text}
        </h6>
      </div>
    </ShownInView>
  );
}

function IconPitch() {
  return (
    <ShownInView timeout={1000}>
      <div id="icon-pitch">
        <Icon timeout={1050} IconSvg={<FontAwesomeIcon icon={faWheatAwn} />} text="Locally sourced" />
        <Icon timeout={1200} IconSvg={<FontAwesomeIcon icon={faMortarPestle} />} text="Handmade" />
        <Icon timeout={1350} IconSvg={<FontAwesomeIcon icon={faReceipt} />} text="To order" />
        <Icon timeout={1500} IconSvg={<FontAwesomeIcon icon={faHeart} />} text="Eat well" />
      </div>
    </ShownInView>
  );
}

export default IconPitch;
