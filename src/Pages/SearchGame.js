import React from 'react';
import { useSelector } from 'react-redux';
import DateSelector from '../Components/DateSelector'

const SearchGame = () => {

  const user = useSelector(state => state.user);
  const dateGames = useSelector(state => state.dateGames);

  onClick = (id) => {
    
  }

  const dateGamesMap = dateGames["games"].map((game) =>
                        <SimpleSelectGame 
                          key={game["id"]} 
                          game={game}
                          onClick={this.onClick}
                        />)
  return (
    <>
     <h2>Search for games by (dropdown date): <DateSelector /></h2> 
    </>
  );
}

export default SearchGame;
