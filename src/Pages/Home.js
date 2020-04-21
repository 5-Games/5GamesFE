import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserPlaylists from '../Containers/UserPlaylists';


const Home = () => {

  // Get user from redux
  const user = useSelector(state => state.user);

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = "Home | 5 Games"
  }, []);

  const conditionalContent = user.username ? (
    // content when user is logged in
    <>
    <div className='row'>
      <div className='single-column'>
        <h3>
          Your Playlists:
        </h3>
        <div>
          <UserPlaylists />
        </div>
      </div>
      <div className='double-column'>
        <h3>
          Links:
        </h3>
        <div className="sub-row">
          <div className="sub-row">
            <div>
              An app by <a className='home-link' href='https://github.com/jfeng530'>Jacky Feng</a> and <a className='home-link' href='https://github.com/stephenkeating'>Stephen Keating</a>.
            </div>
          </div>
          <div className="sub-row">
            <Link to="/playlist/create">Temporary link to create playlist.</Link>
          </div >
        </div>
      </div>
    </div>
  </>
  ) : (
    <>
      <div className='single-column'>
      <h3>
        Please <Link className='home-link' to="/signup">sign up</Link> or <Link className='home-link' to="/login">log in</Link>.
      </h3>
        <div>
        An app by <a className='home-link' href='https://github.com/jfeng530'>Jacky Feng</a> and <a className='home-link' href='https://github.com/stephenkeating'>Stephen Keating</a>.
        </div>
      </div>
    </>
  );

  return <div className="home-page">
          <h1>
            WELCOME TO FIVE GAMES
          </h1>
          <>
            { conditionalContent }
          </>
        </div>
};

export default Home;