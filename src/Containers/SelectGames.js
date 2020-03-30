import React from 'react';
import { useSelector } from 'react-redux';
import SimpleSelectGame from '../Components/SimpleSelectGame';



const SelectGames = () => {
  // Get variables from Redux state
  const selectGames = useSelector(state => state.selectGames);

  // selectGamesMap renders the game components by iterating over selectGames from state
  const selectGamesMap = selectGames["games"].map((game) =>
                        <SimpleSelectGame 
                          key={game["id"]} 
                          game={game}
                        />)

  return <>
          { selectGamesMap } 
        </>
};

export default SelectGames;

