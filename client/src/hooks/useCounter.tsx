import { useEffect, useState } from 'react';

interface UseCounterProps {
  target: number;
  speed?: number;
  fragment?: number;
  animation?: 'linear' | 'ease-out';
  delay?: number;
}

const useCounter = ({
  target,
  speed = 4,
  fragment = 20,
  animation = 'linear',
  delay,
}: UseCounterProps): number => {
  const [count, setCount] = useState(0);
  const quotient = target / fragment;
  useEffect(() => {
    setTimeout(() => {
      for (let n = 0; n <= 20; n += 1) {
        let nAnimation = n;
        if (animation === 'ease-out') {
          nAnimation = n * n;
        }
        setTimeout(() => setCount(quotient * n), nAnimation * speed);
      }
    }, delay);
  }, []);
  return count;
};

export default useCounter;
