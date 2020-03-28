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
    const i = createPlaylistGamesArr.findIndex(e => e === "Add a Game")
    const arr = [...createPlaylistGamesArr]
    arr.splice(i, 1, {...props.game})
    return arr
  }

  const handleAddToPlaylist = () => {
    dispatch(actions.updatePlaylistGames(updatePlaylistGamesArr()));
  };

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

    // formatDate takes JS Date object and returns in format: YYYY-MM-DD
    const formatDate = (date) => {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + (d.getDate() + 1),
          year = d.getYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      if (year > 100)
          year -= 100
  
      return [month, day, year].join('/').toString();
    }

  // Renders the simple game component. Draggable disable for now. Needs Game Summary link.
  const renderGame = (
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
                      <button className="create-playlist-button" onClick={handleAddToPlaylist}>Add to Playlist</button> | <button className="create-playlist-button" onClick={null}>Game Summary</button>
                    </td>
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