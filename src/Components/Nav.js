import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link className='nav-link' to="/"><img className='logo-img' src={logo} alt="Five Games Logo"/></Link>
      </div>
      <div className='nav-links-div'>
        <Link className='nav-link' to="/">Home</Link>
        { name  
          ? <> 
              {/* put links here that show when logged in */}
              
            </>
          : <> 
              <Link className='nav-link' to="/signup">Signup</Link>
              <Link className='nav-link' to="/login">Login</Link>
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
