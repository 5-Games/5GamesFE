import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const EditPlaylistGame = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  console.log(props)

  // Get variables from Redux state
  const editGamesArr = (useSelector(state => state.editPlaylistObj.games))

  const handleMove = action => {
    // dispatch(actions.updateGamesArr(movePlaylistElement(action), page));
  };

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  // Renders either a placeholder box, or the playlist game component. Draggable commented out.
  const renderGame = (
    <div className="simple-game-table-div edit-page-div" >
        <div className="simple-game-summary">
          <div className='simple-game-date'> 
            {`Game ${props.arrIndex + 1}`}
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
                text
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