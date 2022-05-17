import React, { ReactNode } from 'react';

interface ListProps<T> {
  items: T[];
  renderList: (list: T) => ReactNode;
}

function List<T>({
  items, renderList,
}: ListProps<T>) {
  return (
    <ul>
      {items.map(renderList)}
    </ul>
  );
}

export default List;
