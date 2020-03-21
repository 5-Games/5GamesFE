import React, { useEffect } from 'react';

// BrowserRouter is a component
import { BrowserRouter as Router } from 'react-router-dom';

// Start Routing
import Routes from './Routes';
import Nav from './Components/Nav';
// End Routing

import userActions from "./redux/actions"
import {useDispatch} from "react-redux"
import './App.css';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.token) {
      dispatch(userActions.persistUser())
    }
  }, [dispatch]
  )

  return (
    <Router>
      <Nav />
      <div className='routes'>
        <Routes />
      </div>
    </Router>
  );
};

export default App;