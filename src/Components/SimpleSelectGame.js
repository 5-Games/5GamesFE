import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
// import Draggable from 'react-draggable';

const SimpleSelectGame = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Get variables from Redux state
  const createPlaylistGamesArr = useSelector(state => state.createPlaylistGames);

  // Find the next open slot in createPlaylistGamesArr and add the game
  const updatePlaylistGamesArr = () => {
    let i = createPlaylistGamesArr.findIndex(e => e === "Add a Game")
    let arr = [...createPlaylistGamesArr]
    arr.splice(i, 1, {...props.game})
    return arr
  }

  const handleAddToPlaylist = e => {
    e.preventDefault();
    dispatch(actions.updatePlaylistGames(updatePlaylistGamesArr()));
  };

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

  // Renders either a game from the game selector or an empty game object for the playlist
  const renderGame = (
      <div className="game-table-div" >
        {/* <Draggable
          bounds="body"
        > */}
          <div className="simple-game-summary">
            <table>
              <tbody>     
                <tr className={visitorWinner}>
                  <td className="simple-team-name">{props.game['visitor_team']['full_name']}</td>
                  <td className="right">{props.game['visitor_team_score']}</td>
                  <td className="right game-summary-final">
                    Final
                  </td>
                </tr>
                <tr className={homeWinner}>
                  <td className="simple-team-name">{props.game['home_team']['full_name']}</td>
                  <td className="right">{props.game['home_team_score']}</td>
                  <td className="right">&nbsp;
                  </td>
                </tr>
                <tr className="simple-game-link-tr">
                  <td className="simple-game-link-td" colSpan="3">
                  <a onClick={handleAddToPlaylist}>Add to Playlist</a> | Game Summary
                  </td>
                  {/* <td>
                    Game Summary
                  </td> */}
                </tr>
              </tbody>
            </table>
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

export default SimpleSelectGame;