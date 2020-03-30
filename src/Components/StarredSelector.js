import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../redux/actions.js';


const StarredSelector = () => {

  // initializing dispatch
  const dispatch = useDispatch();

  // On loading component, set selectGames to user's starred games.
  useEffect(() => {
    dispatch(actions.setSelectGamesByStarredAction())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>Showing your starred games.</>
  );
};


export default StarredSelector;