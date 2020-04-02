import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../redux/actions';
import SelectMethod from '../Containers/SelectMethod';
import SelectGames from '../Containers/SelectGames';
import SimplePlaylistGame from '../Components/SimplePlaylistGame';


const CreatePlaylist = () => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Get variables from Redux state
  const user = useSelector(state => state.user);
  const method = useSelector(state => state.selectGames["method"]);
  const createPlaylistGames = useSelector(state => state.createPlaylistGames);

  // Controlled form functions
  const handleChange = e =>
    dispatch(actions.setSelectGamesMethodAction(e.target.value));

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = `Create | 5 Games`
  }, []);

  // createPlaylistGamesMap renders the game components by iterating over selectGames
  const createPlaylistGamesMap = () => createPlaylistGames.map((game, i) =>
                        <SimplePlaylistGame 
                          key={i} 
                          game={game}
                          arrIndex={i}
                          page={"create"}
                        />)

  // need to make the action for creating a playlist
  const handleCreate = () => {
    dispatch(actions.continuePlaylistAction());
  };

  // only renders the create playlist button when all 5 games have been added
  const renderCreatePlaylistButton = createPlaylistGames.includes("Add a Game") ? (
    'Select 5 Games'
  ) : (
    <>
      <Link to="/playlist/edit" className="submit-playlist-button" onClick={ handleCreate }>Continue</Link>
    </> 
  )

  // conditionalContent only loads if a user is logged in
  const conditionalContent = user.username ? (
    // content when user is logged in
    <>
      <h2>
        Select Games by &nbsp;
        <select value={method} onChange={handleChange}>
          <option value="date">Date</option>
          <option value="starred games">Starred Games</option>
          <option value="team/year">Team/Year</option>
        </select> 
        &nbsp; <SelectMethod />
      </h2>
      <div className='row'>
        <div className='single-column'>
          <h3>
            {renderCreatePlaylistButton}
          </h3>
          <div className='floating-div'>
            <div className="sub-row"> 
              {createPlaylistGamesMap()}
            </div>
            <h3>
              {renderCreatePlaylistButton}
            </h3>
          </div>
        </div>
        <div className='double-column'>
          <h3>
            Select Games:
          </h3>
          <div className="sub-row">
            <SelectGames />
          </div>
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

