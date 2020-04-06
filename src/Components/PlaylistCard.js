import React from 'react';

const PlaylistCard = ({ playlist }) => {

  // Get variables from Redux state
  // const createGamesArr = (useSelector(state => state.createPlaylistGames))

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  // const formatDate = (date) => {
  //   let d = date.slice(0, 10).split('-');   
  //   return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  // }
  console.log(playlist)

  return (
    <>
    <div className='playlist-card'>
      <h4>{playlist.title}</h4>
      {/* <div>by: {playlist.user_id}</div> */}
      <div>Description: {playlist.description}</div>
      {/* <div>Rating: {playlist.rating}</div> */}
    </div>

    {/* <div className="simple-game-table-div" >
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
    </div> */}
    </>
  );
}

export default PlaylistCard;