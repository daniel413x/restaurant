import React, { useRef } from 'react';
import useParallaxPosition from '../hooks/useParallaxPosition';

function Parallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { parallaxPosition } = useParallaxPosition(ref);
  return (
    <div id="parallax" ref={ref}>
      <div className="parallax-img" style={{ backgroundPosition: `0px -${parallaxPosition}px` }}>
        <h2 className="overlay-header">
          Prepared fresh daily with passion.
        </h2>
      </div>
    </div>
  );
}

export default Parallax;
