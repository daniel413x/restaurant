import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from 'react-beautiful-dnd';
import { Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { ICategory } from '../types/types';
import EditedCategory from './EditedCategory';
import AddCategory from './AddCategory';
import {
  green,
  red,
  shortNotification,
} from '../utils/consts';
import { updateOptionsObject } from '../http/optionsAPI';

const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function SortAndEditCategories() {
  const { categories, notifications } = useContext(Context);
  const { sortingMode } = categories;
  const [sortedCategories, setSortedCategories] = useState<ICategory[]>(categories.sortedPublic);
  const uncategorizedCategory = categories.all.find((cat) => cat.name === 'Uncategorized')!;
  const onDragStart = (start: DragStart) => {
    categories.setDraggedId(start.draggableId);
  };
  const onDragEnd = (result: DropResult) => {
    categories.setDraggedId('');
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const newlySortedCategories = reorder(
      sortedCategories,
      result.source.index,
      result.destination.index,
    );
    setSortedCategories(newlySortedCategories);
  };
  const saveSortingArray = async () => {
    const previousSorting = categories.sorter.array;
    categories.setSortingMode(false);
    const newSorting = sortedCategories.map((cat) => cat.name);
    for (let i = 0; i < newSorting.length; i += 1) {
      if (newSorting[i] !== previousSorting[i]) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await updateOptionsObject(categories.sorter.id, { array: newSorting });
          categories.setSorter(newSorting);
          return notifications.message(
            'Categories re-ordered successfully',
            green,
            shortNotification,
          );
        } catch (error: any) {
          return notifications.message(
            error.response.data.message,
            red,
            shortNotification,
          );
        }
      }
    }
    const revertToPrevious = categories.sortedPublic;
    return setSortedCategories(revertToPrevious);
  };
  const exitSortingModeWithoutSaving = () => {
    categories.setSortingMode(false);
    return setSortedCategories(categories.sortedPublic);
  };
  useEffect(() => {
    setSortedCategories(categories.sortedPublic);
  }, [categories.all]);
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(providedUl) => (
          <ul
            className="collapsible-items-ul"
            ref={providedUl.innerRef}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...providedUl.droppableProps}
          >
            {sortedCategories.map((cat, index) => (
              <Draggable
                draggableId={cat.id}
                index={index}
                isDragDisabled={!sortingMode}
                key={cat.id}
              >
                {(providedLi) => (
                  <li
                    ref={providedLi.innerRef}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...providedLi.draggableProps}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...providedLi.dragHandleProps}
                  >
                    <EditedCategory
                      category={cat}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {providedUl.placeholder}
            {!sortingMode && (
              <li key={uncategorizedCategory.id}>
                <EditedCategory
                  category={uncategorizedCategory}
                />
              </li>
            )}
            {!sortingMode && (
              <li key="addCategoryButton">
                <AddCategory />
              </li>
            )}
            {sortingMode && (
              <li key="saveSortingButton">
                <div className="collapsible-item">
                  <div className="title-buttons-row body">
                    <Col className="tab-col" md="auto">
                      Save
                    </Col>
                    <Col className="icon-buttons" md="auto">
                      <Button title="Save" onClick={saveSortingArray}>
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button title="Cancel" onClick={exitSortingModeWithoutSaving}>
                        <FontAwesomeIcon icon={faBan} />
                      </Button>
                    </Col>
                  </div>
                </div>
              </li>
            )}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default observer(SortAndEditCategories);
