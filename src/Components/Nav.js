import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux';
import logo from '../five-games-logo-500.png';

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const name = useSelector(state => state.user.username);
  
  return (
    <nav className='nav-bar'>
      <div className='logo-div'>
        <Link className='logo-img' to="/"><img className='logo-img' src={logo} alt="Five Games Logo"/></Link>
        <Link className='logo-img' to="/">5 GAMES</Link>
        {/* I want to put just the text "Five Games" here as an image as the link to home */}
      </div>
      <div className='nav-links-div'>
        {/* <NavLink className='nav-link' to="/" >Home</NavLink> */}
        { name  
          ? <> 
              {/* put links here that show when logged in */}
              <NavLink className='nav-link' to="/search" activeClassName='active-nav-link'>Search</NavLink>
              <NavLink className='nav-link' to="/playlist/create" activeClassName='active-nav-link'>Create</NavLink>
            </>
          : <> 
              <NavLink className='nav-link' to="/signup" activeClassName='active-nav-link'>Signup</NavLink>
              <NavLink className='nav-link' to="/login" activeClassName='active-nav-link'>Login</NavLink>
            </>
        }
        { name  
          ? <Link className='nav-link' to="/" onClick={handleLogout}>
              Logout
            </Link>
          : null
        }
        
      </div>
    </nav>
  );
};

export default Nav;
