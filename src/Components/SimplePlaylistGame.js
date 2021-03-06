import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
// import Draggable from 'react-draggable';

const SimplePlaylistGame = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  const page = props.page

  // Get variables from Redux state
  const createGamesArr = (useSelector(state => state.createPlaylistGames))
  const editGamesArr = (useSelector(state => state.editPlaylistObj.games))

  // Move the game up, down, or remove it
  const movePlaylistElement = action => {
    const i = props.arrIndex
    const arr = page === "create" ? [...createGamesArr] : [...editGamesArr]
    if (action === 'up') {
      if (i === 0) {
        return;
      } else {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
        return arr
      }
    } else if (action === 'down') {
      if (i === 4) {
        return;
      } else {
        [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]
        return arr
      }
    } else {
      arr.splice(i, 1, "Add a Game")
      return arr
    }
  }

  const handleMove = action => {
    dispatch(actions.updateGamesArr(movePlaylistElement(action), page));
  };

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

  // only render Up button if index is greater than 0
  const renderUpButton = (props.arrIndex > 0) ? (
    <> <button className="create-playlist-button" onClick={ () => handleMove('up') }>Move Up</button> </> 
    ) : ( null )

  // only render Down button if index is less than 4
  const renderDownButton = (props.arrIndex < 4) ? (
    <> <button className="create-playlist-button" onClick={ () => handleMove('down') }>Move Down</button> </> 
    ) : ( null )

  // only render Down button if on the create page
  const renderRemoveButton = (page === 'create') ? (
    <> <button className="create-playlist-button" onClick={ () => handleMove('remove') }>Remove</button> </> 
    ) : ( null )

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  // Renders either a placeholder box, or the playlist game component. Draggable commented out.
  const renderGame = (
    props.game["id"] ?
      <div className="simple-game-table-div" >
        {/* <Draggable
          bounds="body"
        > */}
          <div className="simple-game-summary">
            <div className='simple-game-date'> 
              {formatDate(props.game.date)}
            </div>
            <table className='simple-game-table'>
              <tbody>     
                <tr className={visitorWinner}>
                  <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${props.game['visitor_team']['abbreviation']}.svg`}></img> </td>
                  <td className="simple-team-name">{props.game['visitor_team']['full_name']}</td>
                  <td className="right">{props.game['visitor_team_score']}</td>
                </tr>
                <tr className={homeWinner}>
                  <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${props.game['home_team']['abbreviation']}.svg`}></img> </td>
                  <td className="simple-team-name">{props.game['home_team']['full_name']}</td>
                  <td className="right">{props.game['home_team_score']}</td>
                  <td className="right">&nbsp;
                  </td>
                </tr>
                <tr className="simple-game-link-tr">
                  <td className="simple-game-link-td" colSpan="3">
                    {renderUpButton} { props.arrIndex > 0 && props.arrIndex < 4 ? ' |' : null } {renderDownButton} { page === 'create' ? ' |' : null } {renderRemoveButton}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        {/* </Draggable> */}
      </div>
    :
    <div className="simple-game-table-div" >
    {/* <Draggable
      bounds="body"
      onStart={() => false}
    > */}
      <div className="create-playlist-box" >
        {`Game ${props.arrIndex + 1}`}
      </div>
    {/* </Draggable> */}
    </div>
  )

  return (
    <>
    {renderGame}
    </>
  )
}

export default SimplePlaylistGame;