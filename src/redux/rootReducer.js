// Notes on Redux:
// Reducer takes two arguments: state and action
// inside the function is a switch case. default returns state. 
// return value of the reducer beccomes the new Redux state

const initialState = {
  user: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return {...state, user: payload};
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};