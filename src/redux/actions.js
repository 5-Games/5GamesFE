// API CONSTANTS

// Backend Constants
  const BASE_URL = 'http://localhost:3000';
  const USERS_URL = BASE_URL + '/users';
  const PERSIST_URL = BASE_URL + '/auth';
  const LOGIN_URL = BASE_URL + '/login';
  const PLAYLIST_URL = BASE_URL + '/playlists/';
  const GAME_URL = BASE_URL + '/games/';

  const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Frontend Constants
  // Ball Dont Lie Constants
  const BDL_API_URL = 'https://www.balldontlie.io/api/v1'
  const BDL_GAMES_URL = BDL_API_URL + '/games'
  const BDL_GAMES_BY_DATE_URL = date => BDL_GAMES_URL + '?start_date=' + date + '&end_date=' + date;
  const BDL_GAMES_BY_TEAM_URL = (teamID, year) => BDL_GAMES_URL + '?seasons[]=' + year + '&team_ids[]=' + teamID + '&per_page=100'

// Redux Actions

  // user Actions
    const setUserAction = userObj => {
      return {
        type: 'SET_USER',
        payload: userObj
      }
    };

    const clearUserAction = () => ({
      type: 'CLEAR_USER'
    });

  // createPlaylistGames Actions
    const updateGamesArr = (gamesArr, page) => {
      if (page === 'create') {
        return {
          type: 'UPDATE_CREATE_GAMES',
          payload: gamesArr
        }
      } else if (page === 'edit') {
        return {
          type: 'UPDATE_EDIT_GAMES',
          payload: gamesArr
        }
      }
    };
    const continuePlaylistAction = () => ({
      type: 'CONTINUE_PLAYLIST'
    });
    const updateTitleDescription = (value, target) => {
      if (target === 'title') {
        return {
          type: 'UPDATE_EDIT_TITLE',
          payload: value
        }
      } else if (target === 'description') {
        return {
          type: 'UPDATE_EDIT_DESCRIPTION',
          payload: value
        }
      }
    };
    const updatePlaylistGameRatingDescription = (value, target, index) => {
      if (target === 'rating') {
        return {
          type: 'UPDATE_PLAYLISTGAME_RATING',
          payload: [value, index]
        }
      } else if (target === 'description') {
        return {
          type: 'UPDATE_PLAYLISTGAME_DESCRIPTION',
          payload: [value, index]
        }
      }
    };

  // selectGames Actions
    const setSelectGamesAction = gamesArr => {
      return {
        type: 'SET_SELECT_GAMES',
        payload: gamesArr
      }
    };
    const setSelectGamesDateAction = date => {
      return {
        type: 'SET_SELECT_GAMES_DATE',
        payload: date
      }
    };
    const setSelectGamesMethodAction = method => {
      return {
        type: 'SET_SELECT_GAMES_METHOD',
        payload: method
      }
    };
    const setSelectGamesTeamAction = team => {
      return {
        type: 'SET_SELECT_GAMES_TEAM',
        payload: team
      }
    };
    const setSelectGamesYearAction = year => {
      return {
        type: 'SET_SELECT_GAMES_YEAR',
        payload: year
      }
    };
    const setSelectGamesByStarredAction = () => ({
        type: 'SET_SELECT_GAMES_BY_STARRED'
    });

// Fetch

  // User Fetches
    // Pattern for new user (with error handling):
    const newUserToDB = userObj => {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
      };
      return fetch(USERS_URL, config)
        .then(r => r.json())
    };

    const deleteUserFromDB = userId => dispatch => {
      const config = {
        method: 'DELETE'
      };
      fetch(SPECIFIC_USER_URL(userId), config)
        .then(r => {
          dispatch(clearUserAction());
          localStorage.clear();
      });
    };

    // Pattern to login (with error handling):
    const loginUserToDB = userCredentials => {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      };
      return fetch(LOGIN_URL, config)
        .then(r => r.json())
    };

    const persistUser = () => dispatch => {
      const config = {
        method: 'GET',
        headers: {
          Authorization: `bearer ` + localStorage.token
        }
      };
      fetch(PERSIST_URL, config)
        .then(r => r.json())
        .then(data => {
          let starred_games = data.user_starred_games
          let playlists = data.playlists
          let starred_playlists = data.starred_playlists
          dispatch(setUserAction({...data.user, starred_games, playlists, starred_playlists}));
        });
    };

    const logoutUser = () => dispatch => {
      dispatch(clearUserAction());
      localStorage.clear();
    };

  // Playlist POST
    const createPlaylist = (playlistObj, userId) => dispatch => {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playlist: playlistObj,
          userId: userId
        })
      };
      return fetch(PLAYLIST_URL, config)
        .then(r => r.json())
        .then(res => dispatch(setPlaylist(res)))
    };

    const setPlaylist = (playlist) => {
      return {
        type: 'UPDATE_USER_PLAYLIST',
        payload: playlist
      }
    }
  // Playlist GET 
    const getCurrentPlaylist = async (id) => {
      const r = await fetch(PLAYLIST_URL + id);
      return await r.json();
    };

    const getCurrentGame = async (date, homeTeam) => {
      const r = await fetch(GAME_URL + date + '/' + homeTeam)
        return await .then(r => r.json())
    };

  // BDL Fetches
    // get all games from [start_date, end_date]
    const getSelectGamesByDate = date => dispatch => {
      fetch(BDL_GAMES_BY_DATE_URL(date))
        .then(r => r.json())
        .then(data => {
          dispatch(setSelectGamesDateAction(date));
          dispatch(setSelectGamesAction(data['data']));
        });
    };
    // get all games for a team and season
    const getSelectGamesByTeam = (teamID, year) => dispatch => {
      fetch(BDL_GAMES_BY_TEAM_URL(teamID, year))
        .then(r => r.json())
        .then(data => {
          dispatch(setSelectGamesAction(data['data'].sort((a, b) => a.date.slice(0, 10).split('-').join('') - b.date.slice(0, 10).split('-').join(''))));
        });
    };

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  setUserAction,
  getSelectGamesByDate,
  updateGamesArr,
  setSelectGamesMethodAction,
  setSelectGamesByStarredAction,
  setSelectGamesTeamAction,
  setSelectGamesYearAction,
  getSelectGamesByTeam,
  continuePlaylistAction,
  updateTitleDescription,
  updatePlaylistGameRatingDescription,
  createPlaylist,
  getCurrentGame,
  getCurrentPlaylist,
};