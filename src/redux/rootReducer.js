// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  createPlaylistGames: ["Add a Game","Add a Game","Add a Game","Add a Game","Add a Game"],
  editPlaylistObj: {
    title: '',
    description: '',
    games: []
  },
  currentGame: '20200308/LALLAC',
  selectGames: {
    // When NBA games resume, change the value of date to today
    date: new Date('March 11, 2020 00:00:00'),
    games: [],
    method: 'date',
    team: '1',
    year: '2019'
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
    case 'UPDATE_CREATE_GAMES':
      return {...state, createPlaylistGames: payload};
    case 'UPDATE_EDIT_GAMES':
      return {...state, 
        editPlaylistObj: {
          ...state.editPlaylistObj,
          games: payload
      }};
    case 'UPDATE_EDIT_TITLE':
      return {...state, 
        editPlaylistObj: {
          ...state.editPlaylistObj,
          title: payload
      }};
    case 'UPDATE_EDIT_DESCRIPTION':
      return {...state, 
        editPlaylistObj: {
          ...state.editPlaylistObj,
          description: payload
      }};
    case 'CONTINUE_PLAYLIST':
      const editGames = [...state.createPlaylistGames]
      return {...state, 
                createPlaylistGames: [...initialState.createPlaylistGames],
                editPlaylistObj: {
                  ...state.editPlaylistObj,
                  games: editGames
              }};

    // selectGames reducers:
    case 'SET_SELECT_GAMES_METHOD':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  method: payload
                }
              };
    case 'SET_SELECT_GAMES':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  games: payload
                }
              };
    case 'SET_SELECT_GAMES_DATE':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  date: new Date(`${payload} 00:00:00`)
                }
              };
    case 'SET_SELECT_GAMES_TEAM':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  team: payload
                }
              };
    case 'SET_SELECT_GAMES_YEAR':
      return {...state, 
                selectGames: {
                  ...state.selectGames, 
                  year: payload
                }
              };
    case 'SET_SELECT_GAMES_BY_STARRED':
      return { ...state, selectGames: { ...state.selectGames, games: [...state.user.starred_games] } }

    default:
      return state;
  }
};