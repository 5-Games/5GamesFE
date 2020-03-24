import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DateSelector from '../Components/DateSelector';
import SimpleGame from '../Components/SimpleGame';


const CreatePlaylist = () => {

  // Get variables from Redux state
  const user = useSelector(state => state.user);
  const dateGames = useSelector(state => state.dateGames);
  const createPlaylistGames = useSelector(state => state.createPlaylistGames);

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = `Create | 5 Games`
  }, []);

  // dateGamesMap renders the game components by iterating over dateGames
  const dateGamesMap = dateGames["games"].map((game, i) =>
                        <SimpleGame 
                          key={i} 
                          game={game}
                        />)

  // createPlaylistGamesMap renders the game components by iterating over dateGames
  const createPlaylistGamesMap = createPlaylistGames.map((game, i) =>
                        <SimpleGame 
                          key={i} 
                          game={game}
                        />)

  // conditionalContent only loads if a user is logged in
  const conditionalContent = user.username ? (
    // content when user is logged in
    <>
      <h2>
        <DateSelector />
      </h2>
      <div className='row'>
        <div className='double-column'>
          <h3>
            Click or drag a game to remove it from your playlist.
          </h3>
          {createPlaylistGamesMap}
        </div>
        <div className='double-column'>
          <h3>
            Click or drag a game to add it to your playlist.
          </h3>
          {dateGamesMap}
        </div>
      </div>
    </>
  ) : (
    // content when there is no user
    <div className='row'>
      <div className='single-column'>
        <h3>
          <Link className='home-link' to="/signup">Sign up</Link> or <Link className='home-link' to="/login">log in</Link> to create a playlist.
        </h3>
      </div>
    </div>
  );

  return <div className="game-show-page">
            <h1>
              CREATE A PLAYLIST
            </h1>
            { conditionalContent } 
        </div>
};

export default CreatePlaylist;

