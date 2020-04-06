import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const EditPlaylistGame = ({ arrIndex, game }) => {
  // initializing dispatch
  const dispatch = useDispatch();


  // On loading component, give each game a rating and description. Need to fix this so they are initialized with them instead.
  useEffect(() => {
    dispatch(actions.updatePlaylistGameRatingDescription('', 'rating', arrIndex));
    dispatch(actions.updatePlaylistGameRatingDescription('', 'description', arrIndex));
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Get variables from Redux state
  const editPlaylistGameRating = useSelector(state => state.editPlaylistObj.games[arrIndex].rating);
  const editPlaylistGameDescription = useSelector(state => state.editPlaylistObj.games[arrIndex].description);

  const handleChange = (e, type) => {
    dispatch(actions.updatePlaylistGameRatingDescription(e.target.value, type, arrIndex));
    return e.target.value.length > 0 ? (e.target.style.backgroundColor = 'white') : (e.target.style.backgroundColor = '#CECCCC')
  };

  // Renders the editable playlistGame
  const renderGame = (
    <div className="simple-game-table-div edit-page-div" >
        <div className="simple-game-summary">
          <div className='simple-game-date'> 
            {`Game ${arrIndex + 1}`}
          </div>
          <table className='simple-game-table'>
            <tbody>
              <tr>
                <td className="input-title-td"> Rating: </td>
                <td className="expanding-input"> Description: </td>
              </tr>
              <tr>
                <td className="input-title-td"> <input type="number" id="quantity" name="quantity" min="1" max="10" value={editPlaylistGameRating} onChange={(e) => handleChange(e, 'rating')} /></td>
                <td> <input type='text' className="expanding-input" placeholder='Optional' value={editPlaylistGameDescription} onChange={(e) => handleChange(e, 'description')} /></td>
              </tr>
              <tr className="simple-game-link-tr">
                <td className="simple-game-logo-div">
                  <img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game['visitor_team']['abbreviation']}.svg`} />
                  <img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game['home_team']['abbreviation']}.svg`} />
                </td>
                <td className="simple-game-link-td"> <button className="create-playlist-button" onClick={null}>Game Summary</button> </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )

  return (
    <>
    {renderGame}
    </>
  )
}

export default EditPlaylistGame;