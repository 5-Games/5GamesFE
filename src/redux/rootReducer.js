// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  createPlaylistGames: ["Add a Game","Add a Game","Add a Game","Add a Game","Add a Game"],
  currentGame: '20200308/LALLAC',
  selectGames: {
    // When NBA games resume, change the value of date to today
    date: new Date('March 11, 2020 00:00:00'),
    team: 'ATL',
    year: 2020,
    games: []
  },
  user: {
    starred_games: [],
    playlists: [],
    starred_playlists: []
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // user reducers:
    case 'SET_USER':
      return {...state, user: payload};
    case 'CLEAR_USER':
      return initialState;

    // createPlaylistGames reducers:
    case 'UPDATE_PLAYLIST_GAMES':
      return {...state, createPlaylistGames: payload};

    // selectGames reducers:
    case 'SET_SELECT_GAMES_BY_DATE':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  date: new Date(`${payload[0]} 00:00:00`), 
                  games: payload[1]
                }};

    default:
      return state;
  }
};