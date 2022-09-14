import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../Backdrop';
import MainHeader from './MainHeader';

import './MainNavigation.scss';
import Navlinks from './Navlinks';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const showDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop handleClose={closeDrawerHandler} />}
      <SideDrawer
        className='main-navigation__drawer-nav'
        show={drawerIsOpen}
        handleClose={closeDrawerHandler}
      >
        <Navlinks />
      </SideDrawer>

      <MainHeader>
        <button
          onClick={showDrawerHandler}
          className='main-navigation__menu-btn'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>YourPlaces</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <Navlinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
