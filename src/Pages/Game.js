import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../redux/actions';
// import PlaylistCard from '../Components/PlaylistCard'

const Game = ({ date, homeTeam }) => {

  // Get variables from Redux state
  const dispatch = useDispatch();
  const [currentG, setCurrentG] = useState({});
  const user = useSelector(state => state.user);
  const currentGame = useSelector(state => state.currentGame);

  // Setting the document title using Hooks.
  // Could use react-document-title instead:
  // https://github.com/gaearon/react-document-title
  useEffect(() => {
    document.title = `${currentGame} | 5 Games`
    dispatch(actions.getCurrentGame(date, homeTeam))
    .then(data => setCurrentG(data))
  }, []);

  const noUser = user.username ? (
    null
  ) : (
    <>
      <br></br>
      <h3>Please <Link className='home-link' to="/signup">sign up</Link> or <Link className='home-link' to="/login">log in</Link>.</h3>
    </>
  );

  const game = (<div className="game_summary expanded nohover">
                  <table className="teams">
                    <tbody>       
                    <tr className="loser">
                      <td><a href="/teams/DEN/2020.html">Denver</a></td>
                      <td className="right">97</td>
                      <td className="right gamelink">
                        <a href="/boxscores/202003110DAL.html">Final</a>
                        
                      </td>
                    </tr>
                    <tr className="winner">
                      <td><a href="/teams/DAL/2020.html">Dallas</a></td>
                      <td className="right">113</td>
                      <td className="right">&nbsp;
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  
                  <table>
                    <thead>
                    <tr>
                      <th></th>
                      <th>1</th><th>2</th><th>3</th><th>4</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><a href="/teams/DEN/2020.html">Denver</a>&nbsp;</td>
                      <td className="center">29</td><td className="center">21</td><td className="center">35</td><td className="center">12</td>
                    </tr>
                    <tr>
                      <td><a href="/teams/DAL/2020.html">Dallas</a>&nbsp;</td>
                      <td className="center">33</td><td className="center">24</td><td className="center">27</td><td className="center">29</td>
                    </tr>
                    </tbody>
                  </table>
                  <p className="box-links"><a href="/boxscores/202003110DAL.html">Box Score</a> | <a href="/boxscores/pbp/202003110DAL.html">Play-By-Play</a> | <a href="/boxscores/shot-chart/202003110DAL.html">Shot Chart</a></p>
                  <table className="stats">
                    <tbody>
                      <tr>
                        <td><strong>PTS</strong></td>
                        <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
                        <td className="right">31</td>
                      </tr>
                      <tr>
                        <td><strong>TRB</strong></td>
                        <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
                        <td className="right">17</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="watch-links">
                    <tbody>
                      <tr>
                        <td><strong>Watch on League Pass</strong></td>
                        {/* <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td> */}
                        {/* <td className="right">31</td> */}
                      </tr>
                      <tr>
                        <td><strong>Basketball Reference Page</strong></td>
                        {/* <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
                        <td className="right">17</td> */}
                      </tr>
                      <tr>
                        <td><strong>Watch YouTube Highlights</strong></td>
                        {/* <td><a href="/players/m/marjabo01.html">B. Marjanović</a>-DAL</td>
                        <td className="right">17</td> */}
                      </tr>
                    </tbody>
                  </table>

                </div>)

  // Function below not ready yet
  // const playlists = currentGame.playlists.map(playlist => <PlaylistCard playlist={playlist}/>)
  
  return <div className="game-show-page">
            <h1>
              {currentGame}
            </h1>
            <div className='game-table-div'>
              {game}
            </div>
            { noUser }
        </div>
};

export default Game;

