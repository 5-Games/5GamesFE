import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import actions from '../redux/actions';
import teamsArr from '../Data/teams.json'
import { Link } from 'react-router-dom';
import ShareLinks from '../Components/ShareLinks';

const Playlist = ({ playlistId }) => {

  // const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState({});
  const [user, setUser] = useState({})

  useEffect(() => {
    document.title = `Playlist | 5 Games`
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch('https://five-games-be.herokuapp.com/playlists/' + playlistId)
      .then(r => r.json())
      .then(res => {
        setPlaylist(res)
        setUser(res.user)
        document.title = `${res.title} | 5 Games`
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const description = playlist.description ?
    <h2>
      {playlist.description}
    </h2>
    :null

  const full_name = (abv) => {
    return teamsArr.find(team => team.abbreviation === abv).full_name
  }

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  const leaguePassLink = (date, away, home) => `https://www.nba.com/games/${date.replace(/-/g,"")}/${away}${home}?ss=watch#/recap`
  const basketballReferenceLink = (date, home) => `https://www.basketball-reference.com/boxscores/${date.replace(/-/g,"")}0${home}.html`

  const leftColumn = playlist.playlist_games ?
    playlist.playlist_games.map(game => {
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
                  <td className="simple-team-name">{full_name(game.game.away)}</td>
                  <td className="right">{game.game.away_score}</td>
                </tr>
                <tr className={game.game.home_score > game.game.away_score ? "winner" : null}>
                  <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game.game.home}.svg`}></img> </td>
                  <td className="simple-team-name">{full_name(game.game.home)}</td>
                  <td className="right">{game.game.home_score}</td>
                  <td className="right">&nbsp;
                  </td>
                </tr>
                <tr className="simple-game-link-tr">
                  <td className="simple-game-link-td" colSpan="3">
                    <Link className='home-link' to={`/games/${game.game.date}/${game.game.home}`} target='_blank' > Game Summary </Link> 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    })
  : 'loading'
  
  const rightColumn = playlist.playlist_games ? 
    // the sort is necessary because the BE returns the games in reverse order
    playlist.playlist_games.sort((a,b) => a.id - b.id).map((game, i) => {
      return (
          <div className="simple-game-table-div edit-page-div" key={game.id**2}>
            <div className="simple-game-summary">
              <div className='simple-game-date'> 
                {`Game ${i + 1}`}
              </div>
              <table className='simple-game-table'>
                <tbody>
                  <tr>
                    <td className="input-title-td"> Rating: </td>
                    <td className="expanding-input"> Comment: </td>
                  </tr>
                  <tr>
                    <td className="input-title-td"> <div>{ game.rating ? game.rating : '~' } </div> </td>
                    <td> <div>{game.comment ? game.comment : '~'} </div> </td>
                  </tr>
                  <tr className="simple-game-link-tr">
                    <td className="description-logo-box">
                        <img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game.game.away}.svg`} />
                        <img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${game.game.home}.svg`} />
                    </td>
                    <td className="simple-game-link-td">
                    <a className='home-link' href={ leaguePassLink(game.game.date, game.game.away, game.game.home) } target='_blank' rel="noopener noreferrer"> NBA League Pass </a> |
                    <a className='home-link' href={ basketballReferenceLink(game.game.date, game.game.home) } target='_blank' rel="noopener noreferrer"> Basketball Reference </a> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      )
    })
    : 'loading'

  return <div className="game-show-page">
            <h1>
              "{playlist.title}" by {user.username}
            </h1>
              {description}
              <div className="playlist-sharing-links">
                <ShareLinks playlist={playlist}/>
              </div>
            <div className='row'>
              <div className='single-column'>
                <div className='floating-div'>
                  <div className="sub-row"> 
                    {leftColumn}
                  </div>
                </div>
              </div>
              <div className='double-column'>
                <div className="sub-row">
                  {rightColumn}
                  {/* {editGamesMap()} */}
                </div>
              </div>
            </div>
            <div className="playlist-sharing-links">
                <ShareLinks playlist={playlist}/>
              </div>
        </div>
};

export default Playlist;
