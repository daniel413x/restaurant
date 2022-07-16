import React, { ReactNode, ReactElement } from 'react';

interface ListProps<T> {
  items: T[];
  renderList: (list: T) => ReactNode;
  className?: string;
  children?: ReactElement;
}

function List<T>({
  items,
  renderList,
  className,
  children,
}: ListProps<T>) {
  return (
    <ul className={`${className}`}>
      {items?.map(renderList)}
      {children}
    </ul>
  );
}

List.defaultProps = {
  className: '',
  children: false,
};

export default List;
