import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/auth-context';

import './Navlinks.scss';

const Navlinks = () => {
  const { isLoggedIn, logout, userId } = useContext(UserContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>
      <li>
        {isLoggedIn && <NavLink to={`/${userId}/places`}>My Places</NavLink>}
      </li>
      <li>{isLoggedIn && <NavLink to='/places/new'>Add Place</NavLink>}</li>
      <li>{!isLoggedIn && <NavLink to='/auth'>Authenticate</NavLink>}</li>
      {isLoggedIn && (
        <li>
          <button onClick={() => logout()}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
