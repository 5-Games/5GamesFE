import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import actions from '../redux/actions.js';

import "react-datepicker/dist/react-datepicker.css";


const DateSelector = () => {

  // initializing dispatch
  const dispatch = useDispatch();

  // Get date from redux. Currently set to Mar 11 (last day of NBA games).
  const dateFromState = useSelector(state => state.selectGames['date']);

  // lastGame is used to prevent the user from selecting dates after the last NBA game on March 11
  const lastGame = new Date("2020-03-11T12:00:00+00:00"); 

  // formatDate takes JS Date object and returns in format: YYYY-MM-DD
  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      // console.log(`${[year, month, day].join('-').toString()}T04:00:00.000Z`)
    return [year, month, day].join('-').toString();
  }

  // On loading component, get fetch games immediately. Comment after function disables the warning.
  useEffect(() => {
    dispatch(actions.getSelectGamesByDate(formatDate(dateFromState)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <DatePicker
      selected={dateFromState}
      // style decision: hide the mini arrow from calendar to input field:
      showPopperArrow={false}
      startDate={lastGame}
      // filterDate is preventing picker from showing dates after lastGame
      filterDate = {(date) => {
        return lastGame > date;
      }}
      onChange={date => {
        dispatch(actions.getSelectGamesByDate(formatDate(date.toISOString())))
      }}
    />
  );
};


export default DateSelector;