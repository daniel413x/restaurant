import React, {
  useEffect, useRef, ReactElement,
} from 'react';

interface FoodItemLiProps {
  children: ReactElement;
  onClick: () => void;
  enterPress: boolean;
}

function FoodItemLi({
  children, onClick, enterPress,
}: FoodItemLiProps) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (document.activeElement === ref.current) {
      onClick();
    }
  }, [enterPress]);
  return (
    <li
      ref={ref}
      className="food-item-li"
    >
      <button
        className="onclick-overlay"
        onClick={() => onClick()}
        tabIndex={0}
        type="button"
      >
        {children}
      </button>
    </li>
  );
}

export default FoodItemLi;
