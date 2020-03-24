// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  createPlaylistGames: [["Game 1"],["Game 2"],["Game 3"],["Game 4"],["Game 5"]],
  currentGame: '20200308/LALLAC',
  dateGames: {
    // When NBA games resume, change the value of date to today
    date: new Date('March 11, 2020 12:00:00'),
    games: []
  },
  user: {},
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
      return {...state, dateGames: {date: payload[0], games: payload[1]}};

    default:
      return state;
  }
};