// API CONSTANTS

// Backend Constants
  const BASE_URL = 'http://localhost:3000';
  const USERS_URL = BASE_URL + '/users';
  const PERSIST_URL = BASE_URL + '/auth';
  const LOGIN_URL = BASE_URL + '/login';
  const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Frontend Constants
  // Ball Dont Lie Constants
  const BDL_API_URL = 'https://www.balldontlie.io/api/v1'
  const BDL_GAMES_URL = BDL_API_URL + '/games'
  // https://www.balldontlie.io/api/v1/games?start_date=2020-03-01&start_date=2020-03-01
  // https://www.balldontlie.io/api/v1/games?start_date=2020-03-09&start_date=2020-03-09
  const BDL_GAME_DATES_URL = date => BDL_GAMES_URL + '?start_date=' + date + '&end_date=' + date;

// Redux Actions

  // User Actions
    const setUserAction = userObj => {
      return {
        type: 'SET_USER',
        payload: userObj
      }
    };

    const clearUserAction = () => ({
      type: 'CLEAR_USER'
    });

  // Date Game Actions
    const setDateGamesAction = gamesObj => {
      return {
        type: 'SET_DATE_GAMES',
        payload: gamesObj
      }
    }

// Fetch

// Pattern for new user (with error handling):
const newUserToDB = userObj => {
  // console.log(userObj)
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
      dispatch(setUserAction(data.user));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

// BDL Actions
const getDateGames = date => dispatch => {
  // const config = {
  //   method: 'GET',
  //   headers: {
  //     start_date: date,
  //     end_date: date
  //   }
  // };
  fetch(BDL_GAME_DATES_URL(date))
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(setDateGamesAction(data['data']));
    });
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  setUserAction,
  getDateGames
};