import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../redux/actions';
import SimplePlaylistGame from '../Components/SimplePlaylistGame';
import EditPlaylistGame from '../Components/EditPlaylistGame';


const EditPlaylist = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Get variables from Redux state
  const user = useSelector(state => state.user);
  const editPlaylistObj = useSelector(state => state.editPlaylistObj);
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
    dispatch(actions.updateTitleDescription(e.target.value, type));
    return e.target.value.length > 0 ? (e.target.style.backgroundColor = 'white') : (e.target.style.backgroundColor = '#CECCCC')
  };

  const handleCreate = () => {
    let userId = user.id
    dispatch(actions.createPlaylist(editPlaylistObj, userId))
      .then(res => {
        dispatch(actions.setPlaylist(res));
        // console.log(res)
        props.history.push(`/playlists/${res.id}`);
      })
    // need to make this send the user to the playlist that was just edited/created.
    // props.history.push('/');
  }

  // only renders the submit playlist button when a title has been added
  const renderCreatePlaylistButton = editPlaylistTitle.length > 0 ? (
    <>
      <Link className="submit-editplaylist-button" to='#' onClick={ () => handleCreate() }>Submit Playlist</Link>
    </> 
  ) : (
    <> Edit Playlist </>
  )

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
            {renderCreatePlaylistButton}
          </h3>
          <div className='floating-div'>
            <div className="sub-row"> 
              {editPlaylistGamesMap()}
            </div>
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
      <h3>
        {renderCreatePlaylistButton}
      </h3>
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

