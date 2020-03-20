import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import { useSelector } from 'react-redux';
import logo from '../five-games-logo.png'; 

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  // const name = useSelector(state => state.user.username);
  
  return (
    <nav className='nav-bar'>
      <div className='logo-div'>
        <Link className='nav-link' to="/"><img className='logo-img' src={logo} alt="Five Games Logo"/></Link>
      </div>
      <div className='nav-links-div'>
        <Link className='nav-link' to="/">HOME</Link>
        {/* { name  
          ? <> 
              put links here that show when logged in
              <Link className='nav-link' to="/portfolio">PORTFOLIO</Link>
              <Link className='nav-link' to="/transactions">TRANSACTIONS</Link>
            </>
          : <> 
              <Link className='nav-link' to="/signup">SIGNUP</Link>
              <Link className='nav-link' to="/login">LOGIN</Link>
            </>
        } */}
        <Link className='nav-link' to="/" onClick={handleLogout}>
          LOGOUT
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
