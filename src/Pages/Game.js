import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import actions from '../redux/actions';
import PlaylistCard from '../Components/PlaylistCard'
import teamsArr from '../Data/teams.json'

const Game = ({ date, homeTeam }) => {

  // Get variables from Redux state
  // const dispatch = useDispatch();
  const [currentG, setCurrentG] = useState({});
  // const user = useSelector(state => state.user);
  
  // destructuring keys from local state
  const {linkDate, away, home, away_score, home_score} = {...currentG}

  const leaguePassLink = `https://www.nba.com/games/${linkDate}/${away}${home}?ss=watch#/recap`
  const basketballReferenceLink = `https://www.basketball-reference.com/boxscores/${linkDate}0${home}.html`

  const formattedGameTitle = away ?
    away + ' vs ' + home + ' - ' + date
    : 'Loading...'

  const full_name = (abv) => {
    return teamsArr.find(team => team.abbreviation === abv).full_name
  }

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    fetch('http://localhost:3000/games/' + date + '/' + homeTeam)
      .then(r => r.json())
      .then(res => {
        setCurrentG(res, res['linkDate'] = res.date.replace(/-/g,""))
        document.title = `${res.away} v ${res.home} - ${res.date} | 5 Games`
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = away_score > home_score ? "winner" : null
  const homeWinner = home_score > away_score ? "winner" : null

  // formatDate takes the BDL date and returns in format: MM-DD-YY
  const formatDate = (date) => {
    let d = date.slice(0, 10).split('-');   
    return d[1] +'/'+ d[2] +'/'+ d[0].slice(2, 4);
  }

  const game = away ? (
    <div className="simple-game-table-div" >
        <div className="simple-game-summary">
          <div className='simple-game-date'> 
            {formatDate(date)}
          </div>
          <table className='simple-game-table'>
            <tbody> 
                <tr className={visitorWinner}>
                  <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${away}.svg`}></img> </td>
                  <td className="simple-team-name">{full_name(away)}</td>
                  <td className="right">{away_score}</td>
                </tr>
                <tr className={homeWinner}>
                  <td className="simple-game-logo-div"><img className='simple-game-logo' alt='team-logo' src={`https://cdn.nba.net/assets/logos/teams/secondary/web/${home}.svg`}></img> </td>
                  <td className="simple-team-name">{full_name(home)}</td>
                  <td className="right">{home_score}</td>
                  <td className="right">&nbsp;
                  </td>
                </tr>
                <tr className="simple-game-link-tr">
                  <td className="simple-game-link-td" colSpan="3">
                    Add to Favorites (coming soon)
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
) : 'loading'

  const playlistsMap = currentG.playlists ? 
    currentG.playlists.map(playlist => <div key={playlist.playlist_id}><PlaylistCard playlist={playlist} /></div>)
    : 'loading'

  const content = 
    <>
      <div className='row'>
        <div className='center-column'>
          <div>
            More stats coming soon...
          </div>
          {game}
          <div>
            <a href={ leaguePassLink } target='_blank' rel="noopener noreferrer"> NBA League Pass </a>
          </div>
          <div>
          <a href={ basketballReferenceLink } target='_blank' rel="noopener noreferrer"> Basketball Reference </a>
          </div>
          {/* <div>
            YouTube Highlights (coming soon...)
          </div> */}
        </div>
        {/* <div className='double-column'> */}
        </div>
        <div className='row'>
          <h3>
            Appears on the following playlists:
          </h3>
          <div className="sub-row">
            { playlistsMap }
          </div>
        {/* </div> */}
      </div>
    </>

  return <div className="game-show-page">
            <h1>
              {formattedGameTitle}
            </h1>
            {content}
        </div>
};

export default Game;


// discarded formatting from Basketball Reference:


  // const game = (<div className="game_summary expanded nohover">
  //                 <table className="teams">
  //                   <tbody>       
  //                   <tr className="loser">
  //                     <td><a href="/teams/DEN/2020.html">Denver</a></td>
  //                     <td className="right">97</td>
  //                     <td className="right gamelink">
  //                       <a href="/boxscores/202003110DAL.html">Final</a>
                        
  //                     </td>
  //                   </tr>
  //                   <tr className="winner">
  //                     <td><a href="/teams/DAL/2020.html">Dallas</a></td>
  //                     <td className="right">113</td>
  //                     <td className="right">&nbsp;
  //                     </td>
  //                   </tr>
  //                   </tbody>
  //                 </table>
                  
  //                 <table>
  //                   <thead>
  //                   <tr>
  //                     <th></th>
  //                     <th>1</th><th>2</th><th>3</th><th>4</th>
  //                   </tr>
  //                   </thead>
  //                   <tbody>
  //                   <tr>
  //                     <td><a href="/teams/DEN/2020.html">Denver</a>&nbsp;</td>
  //                     <td className="center">29</td><td className="center">21</td><td className="center">35</td><td className="center">12</td>
  //                   </tr>
  //                   <tr>
  //                     <td><a href="/teams/DAL/2020.html">Dallas</a>&nbsp;</td>
  //                     <td className="center">33</td><td className="center">24</td><td className="center">27</td><td className="center">29</td>
  //                   </tr>
  //                   </tbody>
  //                 </table>
  //                 <p className="box-links"><a href="/boxscores/202003110DAL.html">Box Score</a> | <a href="/boxscores/pbp/202003110DAL.html">Play-By-Play</a> | <a href="/boxscores/shot-chart/202003110DAL.html">Shot Chart</a></p>
  //                 <table className="stats">
  //                   <tbody>
  //                     <tr>
  //                       <td><strong>PTS</strong></td>
  //                       <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
  //                       <td className="right">31</td>
  //                     </tr>
  //                     <tr>
  //                       <td><strong>TRB</strong></td>
  //                       <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
  //                       <td className="right">17</td>
  //                     </tr>
  //                   </tbody>
  //                 </table>
  //                 <table className="watch-links">
  //                   <tbody>
  //                     <tr>
  //                       <td><strong>Watch on League Pass</strong></td>
  //                     </tr>
  //                     <tr>
  //                       <td><strong>Basketball Reference Page</strong></td>
  //                     </tr>
  //                     <tr>
  //                       <td><strong>YouTube Highlights</strong></td>
  //                     </tr>
  //                   </tbody>
  //                 </table>

  //               </div>)