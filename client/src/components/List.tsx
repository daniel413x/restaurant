import React, { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderList: (list: T) => ReactNode;
  className?: string;
}

function List<T>({
  items, renderList, className,
}: ListProps<T>) {
  return (
    <ul className={`${className}`}>
      {items.map(renderList)}
    </ul>
  );
}

List.defaultProps = {
  className: '',
};

export default List;
