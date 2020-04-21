import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    // updateGamesArr requires the
    dispatch(actions.updateGamesArr(updatePlaylistGamesArr(), 'create'));
  };

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  const passedDate = props.game.date.slice(0, 10);
  const teamAbr = props.game.home_team.abbreviation;

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
                      <button className="create-playlist-button" onClick={handleAddToPlaylist}>Add to Playlist</button> | <Link target='_blank' to={"/games/" + passedDate + "/" + teamAbr}><button className="create-playlist-button" onClick={null}>Game Summary</button></Link>
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