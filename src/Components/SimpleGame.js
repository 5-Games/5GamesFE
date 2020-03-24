import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';

const SimpleGame = props => {
  // initializing dispatch
  // const dispatch = useDispatch();
  // Setting up local state using the useState hook
  // const [stock, setStock] = useState({
  //   ticker: props.ticker,
  //   quantity: props.quantity,
  //   latestPrice: 0,
  //   open: 0
  // });

  // useEffect acts like componentDidMount for Hooks
  // useEffect(() => {
  //   userActions.getQuote(ticker)
  //   .then(data => {
  //     // getting IEX data. if there is no open price, setting open to latestPrice
  //     setStock({...stock, latestPrice: data.latestPrice || 0, open: data.open || data.latestPrice})
  //     // updating redux state with values from IEX. Setting to 0 if API calls fails to prevent NaN values.
  //     dispatch(userActions.setShareValue(data.symbol, data.latestPrice || 0, data.open || 0))
  //   })
  // }, [props.quantity])

  // Destructuring keys from local state to use in the form
  // const { ticker, latestPrice, open } = stock;

  // Getting Stock Quantity from State to force component to reload
  // const stateQuantity = useSelector(state => state.portfolio[ticker].quantity);

  console.log(props)

  return (
    <div className="SimpleGame" >
      <div className="game_summary expanded nohover">
        <table className="teams">
          <tbody>       
            <tr>
              <td>{props.game['visitor_team']['full_name']}</td>
              <td className="right">{props.game['visitor_team_score']}</td>
              <td className="right gamelink">
                Final
              </td>
            </tr>
            <tr>
              <td>{props.game['home_team']['full_name']}</td>
              <td className="right">{props.game['home_team_score']}</td>
              <td className="right">&nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SimpleGame;