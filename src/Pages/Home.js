import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Home = () => {

  // Get user from redux
  const user = useSelector(state => state.user);

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = "Home | 5 Games"
  }, []);

  const noUser = user.username ? (
    null
  ) : (
    <>
      <br />
      <h3>Please <Link className='home-link' to="/signup">sign up</Link> or <Link className='home-link' to="/login">log in</Link>.</h3>
    </>
  );

  return <div className="home-page">
          <h1>
            WELCOME TO FIVE GAMES
          </h1>
          <div className="row">
            <div className="single-column">
              An app by <a className='home-link' href='https://github.com/jfeng530'>Jacky Feng</a> and <a className='home-link' href='https://github.com/stephenkeating'>Stephen Keating</a>.
            </div>
          </div>
          <div className="row">
            <div className="single-column">
            <Link to="/game">Temporary link to current game.</Link>
            </div>
          </div>
          <div className="row">
            <div className="single-column">
              <Link to="/playlist/create">Temporary link to create playlist.</Link>
            </div>
          </div>
          <div className="row">
            <div className="single-column">
              { noUser }
            </div>
          </div>
        </div>
};

export default Home;