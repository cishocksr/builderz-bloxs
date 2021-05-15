const cards = [
  {
    id: 'card-1',
    title: 'Learning how to cook',
  },
  {
    id: 'card-2',
    title: 'Making sandwich',
  },
  {
    id: 'card-3',
    title: 'Taking the trash out',
  },
];

const lists = [
  {
    id: 'list-1',
    title: 'Todo',
    cards,
  },

  {
    id: 'list-2',
    title: 'Doing',
    cards: [],
  },
];

export default lists;
