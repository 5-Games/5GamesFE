import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions.js';
import teamsArr from '../Data/teams.json'

const TeamSelector = () => {

  // initializing dispatch
  const dispatch = useDispatch();

  // Get variables from redux state.
  const team = useSelector(state => state.selectGames['team']);
  const year = useSelector(state => state.selectGames['year']);

  // On loading component, get fetch games immediately. Comment after function disables the warning.
  // useEffect(() => {
  //   dispatch(actions.getSelectGamesByDate(formatDate(dateFromState)))
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // const teamsArr = [{label: 'Atlanta Hawks', value: 'ATL'},
  //   {label: 'Boston Celtics', value: 'BOS'},
  //   {label: 'Chicago Bulls', value: 'CHI'},
  //   {label: 'Cleveland Cavaliers', value: 'CLE'},
  //   {label: 'Charlotte Hornets', value: 'CHA'},
  //   {label: 'Dallas Mavericks', value: 'DAL'},
  //   {label: 'Denver Nuggets', value: 'DEN'},
  //   {label: 'Detroit Pistons', value: 'DET'},
  //   {label: 'Golden State Warriors', value: 'GSW'},
  //   {label: 'Houston Rockets', value: 'HOU'},
  //   {label: 'Los Angeles Clippers', value: 'LAC'},
  //   {label: 'Indiana Pacers', value: 'IND'},
  //   {label: 'Los Angeles Lakers', value: 'LAL'},
  //   {label: 'Minnesota Timberwolves', value: 'MIN'},
  //   {label: 'Memphis Grizzlies', value: 'MEM'},
  //   {label: 'Miami Heat', value: 'MIA'},
  //   {label: 'Milwaukee Bucks', value: 'MIL'},
  //   {label: 'New York Knicks', value: 'NYK'},
  //   {label: 'Orlando Magic', value: 'ORL'},
  //   {label: 'New Orleans Pelicans', value: 'NOP'},
  //   {label: 'Oklahoma City Thunder', value: 'OKC'},
  //   {label: 'Philadelphia 76ers', value: 'PHI'},
  //   {label: 'Portland Trail Blazers', value: 'POR'},
  //   {label: 'Sacramento Kings', value: 'SAC'},
  //   {label: 'Toronto Raptors', value: 'TOR'},
  //   {label: 'Brooklyn Nets', value: 'BKN'},
  //   {label: 'San Antonio Spurs', value: 'SAS'},
  //   {label: 'Utah Jazz', value: 'UTA'},
  //   {label: 'Phoenix Suns', value: 'PHX'},
  //   {label: 'Washington Wizards', value: 'WSH'}]

  const teamOptions = teamsArr.map((team, i) =>
    <option key={i} value={team['id']} label={team['full_name']}/>)

  return (
    <>
      <select value={team} onChange={e => {
        dispatch(actions.setSelectGamesTeamAction(e.target.value))
        dispatch(actions.getSelectGamesByTeam(e.target.value, year))
      }}>
        {teamOptions}
      </select> 
      <>  </>
      <select value={year} onChange={e => {
        dispatch(actions.setSelectGamesYearAction(e.target.value))
        dispatch(actions.getSelectGamesByTeam(team, e.target.value))
      }}>
        <option value="2019">2019-2020</option>
        <option value="2018">2018-2019</option>
        <option value="2017">2017-2018</option>
        <option value="2016">2016-2017</option>
        <option value="2015">2015-2016</option>
        <option value="2014">2014-2015</option>
        <option value="2013">2013-2014</option>
        <option value="2012">2012-2013</option>
        <option value="2011">2011-2012</option>
        <option value="2010">2010-2011</option>
        <option value="2009">2009-2010</option>
        <option value="2008">2008-2009</option>
        <option value="2007">2007-2008</option>
        <option value="2006">2006-2007</option>
        <option value="2005">2005-2006</option>
        <option value="2004">2004-2005</option>
        <option value="2003">2003-2004</option>
        <option value="2002">2002-2003</option>
        <option value="2001">2001-2002</option>
        <option value="2000">2000-2001</option>
        <option value="1999">1999-2000</option>
        <option value="1998">1998-1999</option>
        <option value="1997">1997-1998</option>
        <option value="1996">1996-1997</option>
        <option value="1995">1995-1996</option>
        <option value="1994">1994-1995</option>
        <option value="1993">1993-1994</option>
        <option value="1992">1992-1993</option>
        <option value="1991">1991-1992</option>
        <option value="1990">1990-1991</option>
        <option value="1989">1989-1990</option>
        <option value="1988">1988-1989</option>
        <option value="1987">1987-1987</option>
        <option value="1986">1986-1987</option>
        <option value="1985">1985-1986</option>
        <option value="1984">1984-1985</option>
        <option value="1983">1983-1984</option>
        <option value="1982">1982-1983</option>
        <option value="1981">1981-1982</option>
        <option value="1980">1980-1981</option>
        <option value="1979">1979-1980</option>
        <option value="1978">1978-1979</option>
        <option value="1977">1977-1978</option>
        <option value="1976">1976-1977</option>
        <option value="1975">1975-1976</option>
        <option value="1974">1974-1975</option>
        <option value="1973">1973-1974</option>
        <option value="1972">1972-1973</option>
        <option value="1971">1971-1972</option>
        <option value="1970">1970-1971</option>
        <option value="1969">1969-1970</option>
        <option value="1968">1968-1969</option>
        <option value="1967">1967-1968</option>
        <option value="1966">1966-1967</option>
        <option value="1965">1965-1966</option>
        <option value="1964">1964-1965</option>
        <option value="1963">1963-1964</option>
        <option value="1962">1962-1963</option>
        <option value="1961">1961-1962</option>
        <option value="1960">1960-1961</option>
        <option value="1959">1959-1960</option>
        <option value="1958">1958-1959</option>
        <option value="1957">1957-1958</option>
        <option value="1956">1956-1957</option>
        <option value="1955">1955-1956</option>
        <option value="1954">1954-1955</option>
        <option value="1953">1953-1954</option>
        <option value="1952">1952-1953</option>
        <option value="1951">1951-1952</option>
        <option value="1950">1950-1951</option>
        <option value="1949">1949-1950</option>
      </select> 
    </>
  );
};


export default TeamSelector;