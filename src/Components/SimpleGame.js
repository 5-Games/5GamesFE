import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';
// import Draggable from 'react-draggable';

const SimpleGame = props => {
  // visitorWinner and homeWinner are used to change the className and bold the team name of the winner
  const visitorWinner = props.game['visitor_team_score'] > props.game['home_team_score'] ? "winner" : null
  const homeWinner = props.game['home_team_score'] > props.game['visitor_team_score'] ? "winner" : null

  // Renders either a game from the game selector or an empty game object for the playlist
  const renderGame = (
    props.game["id"] ?
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
                  <td className="simple-game-link-td" colspan="3">
                    Add to Playlist | Game Summary
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
    :
    <div className="game-table-div" >
    {/* <Draggable
      bounds="body"
      onStart={() => false}
    > */}
      <div className="create-playlist-box" >
        {props.game}
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

export default SimpleGame;