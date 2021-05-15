import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import InputContainer from './components/input/inputContainer';
import List from './components/lists/lists';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: 'green',
    width: '100%',
    overflowY: 'auto',
  },
}));

export default function App() {
  const [listData, setListData] = useState(store);
  const classes = useStyle();
  // const listId = listData.id;

  const addMoreCard = (title, listId) => {
    console.log(title, listId);
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    // const list = listData;
    listData[0].cards = [...listData.cards, newCard];

    const newState = {
      ...listData,
    };
    setListData(newState);

    // const newCard = {
    //   id: newCardId,
    //   title,
    // };

    // const list = listData.id;
    // list.cards = [...list.cards, newCard];

    // const newState = {
    //   ...listData,
    // };
    // setListData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...listData.listIds, newListId],
      lists: {
        ...listData.lists,
        [newListId]: newList,
      },
    };
    setListData(newState);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (type === 'list') {
      const newListIds = listData.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }
    const sourceList = listData.lists[source.droppableId];
    const destinationList = listData.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...listData,
        lists: {
          ...listData.lists,
          [sourceList.id]: destinationList,
        },
      };

      setListData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...listData,
        lists: {
          ...listData.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setListData(newState);
    }
  };

  const updateListTitle = (title, listId) => {
    const list = listData.lists[listId];
    list.title = title;

    const newState = {
      ...listData,
      lists: {
        ...listData.lists,
        [listId]: list,
      },
    };
    setListData(newState);
  };

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='app' type='list' direction='horizontal'>
          {(provided) => (
            <div
              className={classes.root}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {listData.map((l, index) => {
                return <List list={l} key={l} index={index} />;
              })}
              <InputContainer type='list' />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
}
