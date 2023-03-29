import React from 'react';
import useCounter from '../hooks/useCounter';
import ShownInView from './ShownInView';

interface StatProps {
  figure: number;
  text: string;
  timeout: number;
}

function Stat({
  figure,
  text,
  timeout,
}: StatProps) {
  const count = useCounter({
    target: figure,
    speed: 4,
    fragment: 20,
    animation: 'ease-out',
    delay: timeout + 400,
  });
  return (
    <ShownInView
      timeout={timeout}
    >
      <div className="stat">
        <span className="figure">
          {count.toFixed()}
        </span>
        <span className="legend">
          {text}
        </span>
      </div>
    </ShownInView>
  );
}

function IconPitch() {
  return (
    <ShownInView timeout={1000}>
      <div id="stats">
        <Stat timeout={1050} figure={779} text="Salads" />
        <Stat timeout={1200} figure={1406} text="Sandwiches" />
        <Stat timeout={1350} figure={3952} text="Take-outs" />
        <Stat timeout={1500} figure={209} text="Breakfasts" />
      </div>
    </ShownInView>
  );
}

export default IconPitch;
