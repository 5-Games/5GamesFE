// API CONSTANTS

// Backend Constants
const BASE_URL = 'http://localhost:3000';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/auth';
const LOGIN_URL = BASE_URL + '/login';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Frontend Constants
  // add API constants here

// Redux Actions

const setUserAction = userObj => {
  return {
    type: 'SET_USER',
    payload: userObj
  }
};

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

// Fetch

// Pattern for new user (without error handling):
// const newUserToDB = userObj => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userObj)
//   };
//   fetch(USERS_URL, config)
//     .then(r => r.json())
//     .then(data => {
//       dispatch(setUserAction(data.user));
//       localStorage.setItem('token', data.token);
//     });
// };

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

// Pattern to login user (without error Handling):
// const loginUserToDB = userCredentials => dispatch => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userCredentials)
//   };
//   fetch(LOGIN_URL, config)
//     .then(r => r.json())
//     .then(data => {
//       dispatch(setUserAction(data.user));
//       localStorage.setItem('token', data.token);
//     })
// };

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

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  setUserAction
};