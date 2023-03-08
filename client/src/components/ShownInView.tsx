import React, {
  forwardRef, RefObject, useEffect, useRef,
} from 'react';
import useFixatedInView from '../hooks/useFixatedInView';
import { Children } from '../types/types';

interface ShownInViewProps {
  className?: string;
  id?: string;
  children: Children;
  timeout?: number;
  func?: () => void;
  animation?: 'anim-one' | 'anim-two' | 'anim-three' | 'anim-four';
}

const ShownInView = forwardRef(({
  className,
  children,
  id,
  timeout,
  func,
  animation,
}: ShownInViewProps, passedInRef: any) => {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = passedInRef || defaultRef;
  const { fixated, loaded } = useFixatedInView({
    ref,
    func,
    timeout,
    id,
  });
  const preventPrematureLoad = func && !loaded;
  useEffect(() => {
    console.log(ref);
  }, [fixated]);
  const componentCanShow = (func && loaded) || (!func && fixated);
  return (
    <div
      className={`${className} shown-in-view ${componentCanShow && 'show'} ${componentCanShow && animation}`}
      id={id}
      ref={ref}
      style={{ height: preventPrematureLoad ? '100vh' : '' }}
    >
      {children}
    </div>
  );
});

ShownInView.defaultProps = {
  className: '',
  animation: 'anim-one',
  id: undefined,
  timeout: undefined,
  func: undefined,
};

export default ShownInView as (props: ShownInViewProps & { passedInRef?: RefObject<any> }) => JSX.Element;
