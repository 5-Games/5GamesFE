import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../redux/actions';
import SimplePlaylistGame from '../Components/SimplePlaylistGame';
import EditPlaylistGame from '../Components/EditPlaylistGame';


const EditPlaylist = () => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Get variables from Redux state
  const user = useSelector(state => state.user);
  const editPlaylistTitle = useSelector(state => state.editPlaylistObj.title);
  const editPlaylistDescription = useSelector(state => state.editPlaylistObj.description);
  const editPlaylistGamesArr = useSelector(state => state.editPlaylistObj.games);

  // Controlled form functions
  // const handleChange = e =>
  //   dispatch(actions.setSelectGamesMethodAction(e.target.value));

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = `Edit | 5 Games`
  }, []);

  // editPlaylistGamesMap renders the game components by iterating over selectGames
  const editPlaylistGamesMap = () => editPlaylistGamesArr.map((game, i) =>
                        <SimplePlaylistGame 
                          key={i} 
                          game={game}
                          arrIndex={i}
                          page={'edit'}
                        />)

  // editPlaylistGamesMap renders the game components by iterating over selectGames
  const editGamesMap = () => editPlaylistGamesArr.map((game, i) =>
                        <EditPlaylistGame 
                          key={i} 
                          game={game}
                          arrIndex={i}
                        />)

  const handleChange = (e, type) => {
    // console.log(`change ${type}`)
    dispatch(actions.updateTitleDescription(e.target.value, type));
  };

  // only renders the create playlist button when all 5 games have been added
  // const renderCreatePlaylistButton = createPlaylistGames.includes("Add a Game") ? (
  //   'Add 5 Games'
  // ) : (
  //   <>
  //     <button className="submit-playlist-button" onClick={ () => handleCreate() }>Create Playlist</button>
  //   </> 
  // )

  // conditionalContent only loads if a user is logged in
  const conditionalContent = user.username ? (
    // content when user is logged in
    <>
      <h2>
        Title: &nbsp;
        <input type="text" placeholder='Add a Title' value={editPlaylistTitle} onChange={(e) => handleChange(e, 'title')} />
        <> </>
        Description: &nbsp;
        <textarea placeholder='Optional' value={editPlaylistDescription} onChange={(e) => handleChange(e, 'description')} />
      </h2>
      <div className='row'>
        <div className='single-column'>
          <h3>
            Playlist:
            {/* {renderCreatePlaylistButton} */}
          </h3>
          <div className='floating-div'>
            <div className="sub-row"> 
              {editPlaylistGamesMap()}
            </div>
            <h3>
              {/* {renderCreatePlaylistButton} */}
            </h3>
          </div>
        </div>
        <div className='double-column'>
          <h3>
            Give each game a rating and comment (optional):
          </h3>
          <div className="sub-row">
            {editGamesMap()}
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
              EDIT PLAYLIST
            </h1>
            { conditionalContent } 
        </div>
};

export default EditPlaylist;

