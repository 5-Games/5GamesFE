// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  user: {},
  dateGames: {
    date: new Date('March 11, 2020 12:00:00'),
    games: []
  },
  currentGame: '20200308/LALLAC'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // user reducers:
    case 'SET_USER':
      return {...state, user: payload};
    case 'CLEAR_USER':
      return initialState;

    // dateGame reducers:
    case 'SET_DATE_GAMES':
      return {...state, dateGames: {...state.dateGames, games: payload}};

    default:
      return state;
  }
};