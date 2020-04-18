import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import actions from '../redux/actions';
import teamsArr from '../Data/teams.json'

const Playlist = ({ playlistId }) => {

  // const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({});

  console.log(teamsArr)

  useEffect(() => {
    fetch('http://localhost:3000/playlists/' + playlistId)
      .then(r => r.json())
      .then(res => setPlaylist(res))
  }, []);

  const description = playlist.description
    ?<h2>
      {playlist.description}
    </h2>
    :null

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  const leftColumn = playlist.playlist_games 
  ? playlist.playlist_games.map(game => {
    return < div key={game.id} > 
      <div className="simple-game-table-div" >
        <div className="simple-game-summary">
          <div className='simple-game-date'> 
            {formatDate(game.game.date)}
          </div>
          <table className='simple-game-table'>
            <tbody>     
              <tr className={game.game.away_score > game.game.home_score ? "winner" : null}>
                <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game.game.away}.svg`}></img> </td>
                <td className="simple-team-name">{game.game.away}</td>
                <td className="right">{game.game.away_score}</td>
              </tr>
              <tr className={game.game.home_score > game.game.away_score ? "winner" : null}>
                <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game.game.home}.svg`}></img> </td>
                <td className="simple-team-name">{game.game.home}</td>
                <td className="right">{game.game.home_score}</td>
                <td className="right">&nbsp;
                </td>
              </tr>
              <tr className="simple-game-link-tr">
                <td className="simple-game-link-td" colSpan="3">
                  View Game Summary
                  {/* {renderUpButton} { arrIndex > 0 && arrIndex < 4 ? ' |' : null } {renderDownButton} { page === 'create' ? ' |' : null } {renderRemoveButton} */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  })
  : 'test'

  return <div className="game-show-page">
            <h1>
              {playlist.title}
            </h1>
              {description}
            <div className='row'>
              <div className='single-column'>
                <div className='floating-div'>
                  <div className="sub-row"> 
                    {leftColumn}
                    {/* left column */}
                    {/* {editPlaylistGamesMap()} */}
                  </div>
                </div>
              </div>
              <div className='double-column'>
                <div className="sub-row">
                  right column
                  {/* {editGamesMap()} */}
                </div>
              </div>
            </div>
        </div>
};

export default Playlist;
