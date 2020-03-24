import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import actions from '../redux/actions.js';

import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {

  // initializing dispatch
  const dispatch = useDispatch();
  
  // Setting up local state using the useState hook
  const [startDate, setStartDate] = useState(null);

  // Get Mar 11 (last day of NBA games) from redux
  const dateFromState = useSelector(state => state.dateGames['date']);

  // lastGame is used to prevent the user from selecting dates after the last NBA game on March 11
  const lastGame = new Date('March 11, 2020 12:00:00');

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

    return [year, month, day].join('-').toString();
  }

  // On loading component, get date from State and set start date to lastGame
  useEffect(() => {
    dispatch(actions.getDateGames(formatDate(dateFromState)))
    setStartDate(lastGame)
  }, []);


  return (
    <DatePicker
      selected={startDate}
      // style decision: hide the mini arrow from calendar to input field:
      showPopperArrow={false}
      startDate={lastGame}
      // filterDate is preventing picker from showing dates after lastGame
      filterDate = {(date) => {
        return lastGame > date;
      }}
      onChange={date => {
        setStartDate(date)
        dispatch(actions.getDateGames(formatDate(date)))
      }}
    />
  );
};


export default DateSelector;