import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DateSelector from '../Components/DateSelector';


const CreatePlaylist = () => {

  // Get variables from Redux state
  const user = useSelector(state => state.user);

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = `Create | 5 Games`
  }, []);

  const noUser = user.username ? (
    <div className='row'>
      <div className='double-column'>
        left column
      </div>
      <div className='double-column'>
        right column
      </div>
    </div>
  ) : (
    <>
    <div className='row'>
      <div className='single-column'>
        <h3>
          Please <Link className='home-link' to="/signup">sign up</Link> or <Link className='home-link' to="/login">log in</Link>.
        </h3>
      </div>
    </div>
    </>
  );

  return <div className="game-show-page">
            <h1>
              CREATE A PLAYLIST
            </h1>
            <h2>
              <DateSelector />
            </h2>
            { noUser } 
        </div>
};

export default CreatePlaylist;

