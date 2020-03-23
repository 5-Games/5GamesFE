import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import actions from '../redux/actions.js';

import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {

  // initializing dispatch
  const dispatch = useDispatch();
  
  // Setting up local state using the useState hook
  const [startDate, setStartDate] = useState(new Date('March 11, 2020 12:00:00'));
  // const [startDate, setStartDate] = useState(null);

  // Get Mar 11 (last day of NBA games) from redux
  // const user = useSelector(state => state.user);

  // March 11 is the day of the last NBA games
  const dateObj = new Date('March 11, 2020 12:00:00');

  // takes JS Date object and returns in format: YYYY-MM-DD
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

  useEffect(() => {
    dispatch(actions.getDateGames(formatDate(new Date('March 11, 2020 12:00:00'))))
  }, []);

  return (
    <DatePicker
      selected={startDate}
      placeholderText="Select a date"
      // hide the arrow from calendar to input field:
      showPopperArrow={false}
      startDate={new Date('March 11, 2020 12:00:00')}
      // option to prevent picker from showing dates after March 11, which was the day of the last NBA games
      filterDate = {(date) => {
        return dateObj > date;
      }}
      onChange={date => {
        setStartDate(date)
        // console.log(formatDate(date))
        dispatch(actions.getDateGames(formatDate(date)))
      }}
    />
  );
};


export default DateSelector;