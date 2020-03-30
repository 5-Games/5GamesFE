import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
import DateSelector from '../Components/DateSelector';
import TeamSelector from '../Components/TeamSelector';
import StarredSelector from '../Components/StarredSelector';


const SelectMethod = () => {
  // Get variables from Redux state
  const method = useSelector(state => state.selectGames["method"]);

  const selectMethod = value => {
    switch(value) {
      case "date":
        return <DateSelector />
      case "starred games":
        return <StarredSelector />
      case "team/year":
        return <TeamSelector />
      default:
        return <DateSelector />
    }
  }

  return <>
          {selectMethod(method)}
        </>
};

export default SelectMethod;

