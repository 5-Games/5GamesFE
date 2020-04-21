import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions.js';

const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
  });

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = "Signup | 5 Games"
  }, []);

  // Controlled form functions
  const handleChange = e => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    return e.target.value.length > 0 ? (e.target.style.backgroundColor = 'white') : (e.target.style.backgroundColor = '#CECCCC')
  }

  // Pattern with error handling:
  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    actions.newUserToDB(signupForm)
    .then(data => {
        if(data.errors) {
          alert(data.errors);
          return;
        } else {
        let starred_games = []
        let playlists = []
        let starred_playlists = []
        dispatch(actions.setUserAction({...data.user, starred_games, playlists, starred_playlists}));
        localStorage.setItem('token', data.token);
        history.push('/');
    }
    })};

  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;

  // Component code
  return (
    <div className="auth-page">
      <h1>Signup Page</h1>
      <div className="row">
        <div className='single-column'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            <br></br>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
